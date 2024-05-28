const { StatusCodes } = require('http-status-codes')
const Order = require('../models/Order')
const Product = require('../models/Product')
const { checkPermissions } = require('../utils')
const { BadRequestError, NotFoundError } = require('../errors')

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body

  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError('No cart items provided')
  }

  if (!tax || !shippingFee) {
    throw new BadRequestError('Please provide tax and shipping fee')
  }

  let orderItems = []
  let subtotal = 0

  for (const item of cartItems) {
    const productId = item.id.split('#')

    const dbProduct = await Product.findOne({ _id: productId[0] })
    if (!dbProduct) {
      throw new NotFoundError(`No product with id : ${item.product}`)
    }

    const { name, price, image, _id } = dbProduct
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      color: productId[1],
      product: _id,
    }
    // add item to order
    orderItems = [...orderItems, singleOrderItem]
    // calculate subtotal
    subtotal += item.amount * price
  }

  const total = tax + shippingFee + subtotal

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'cad',
  })

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  })

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret })
}

const getAllOrders = async (req, res) => {
  const orders = await Order.find({})
  res.status(StatusCodes.OK).json({ orders, count: orders.length })
}

const getSingleOrders = async (req, res) => {
  const { id: orderId } = req.params
  const order = await Order.findOne({ _id: orderId })

  if (!order) {
    throw new NotFoundError(`No order with id : ${orderId}`)
  }

  checkPermissions(req.user, order.user)
  res.status(StatusCodes.OK).json({ order })
}

const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId })
  res.status(StatusCodes.OK).json({ orders, count: orders.length })
}

const updateOrder = async (req, res) => {
  const { id: orderId } = req.params
  const { paymentIntentId, address } = req.body

  console.log(orderId)
  console.log('body:', req.body)

  const order = await Order.findOne({ _id: orderId })
  if (!order) {
    throw new NotFoundError(`No order with id : ${orderId}`)
  }

  console.log(address)

  checkPermissions(req.user, order.user)
  order.paymentIntentId = paymentIntentId
  order.status = 'paid'
  order.shippingAddress = address
  await order.save()
  res.status(StatusCodes.OK).json({ order })
}

module.exports = {
  getAllOrders,
  getSingleOrders,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
}
