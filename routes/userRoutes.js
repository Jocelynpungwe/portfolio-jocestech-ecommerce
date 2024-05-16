const express = require('express')
const router = express.Router()

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/userController')
const authenticationMiddleware = require('../middleware/authentication')
const authorizeMiddleware = require('../middleware/authorize')

router.get(
  '/',
  authenticationMiddleware,
  authorizeMiddleware('admin', 'owner'),
  getAllUsers
)
router.get('/showMe', showCurrentUser)
router.patch('/updateUser', updateUser)
router.patch('/updateUserPassword', updateUserPassword)
router.get('/:id', authenticationMiddleware, getSingleUser)

module.exports = router
