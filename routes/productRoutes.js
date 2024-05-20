const express = require('express')
const router = express.Router()
const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require('../controllers/productController')

const { getSingleProductReviews } = require('../controllers/reviewController')

const authenticationMiddleware = require('../middleware/authentication')
const authorizeMiddleware = require('../middleware/authorize')

router.get('/', authenticationMiddleware, getAllProducts)
router.get('/:id', authenticationMiddleware, getSingleProduct)
router.post(
  '/',
  authenticationMiddleware,
  authorizeMiddleware('admin'),
  createProduct
)
router.patch(
  '/:id',
  authenticationMiddleware,
  authorizeMiddleware('admin'),
  updateProduct
)
router.delete(
  '/:id',
  authenticationMiddleware,
  authorizeMiddleware('admin'),
  deleteProduct
)
router.post(
  '/uploadImage',
  authenticationMiddleware,
  authorizeMiddleware('admin'),
  uploadImage
)

router.get('/:id', getSingleProductReviews)

module.exports = router
