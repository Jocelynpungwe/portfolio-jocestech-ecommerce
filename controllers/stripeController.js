const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)

const stripeController = async (req, res) => {
  const { items } = req.body
  const { purchese, total_amount, shipping_fee } = req.body

  const calculateOrderAmount = () => {
    //check the corrent pricess throw the data base
    return total_amount + shipping_fee
  }

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'cad',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  })

  res.json({
    clientSecret: paymentIntent.client_secret,
  })
}
module.exports = stripeController
