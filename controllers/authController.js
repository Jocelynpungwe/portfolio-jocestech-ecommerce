const registerUser = (req, res) => {
  res.status(200).send('register user')
}

const loginUser = (req, res) => {
  res.status(200).send('login user')
}

const logoutUser = (req, res) => {
  res.status(200).send('logout user')
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
}
