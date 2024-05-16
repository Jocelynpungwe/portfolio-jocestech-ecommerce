const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const { NotFoundError } = require('../errors')

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password')
  res.status(StatusCodes.OK).json({ users })
}

const getSingleUser = async (req, res) => {
  const { id: userId } = req.params
  const user = await User.findOne({ _id: userId }).select('-password')

  if (!user) {
    throw new NotFoundError(`No user with id : ${userId}`)
  }

  res.status(StatusCodes.OK).json({ user })
}

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).send('show current user')
}

const updateUser = async (req, res) => {
  res.status(StatusCodes.OK).send('update user')
}

const updateUserPassword = async (req, res) => {
  res.status(StatusCodes.OK).send('update user password')
}

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
}
