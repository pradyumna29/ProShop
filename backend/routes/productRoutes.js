import express from 'express'
const router = express.Router()
import {
  getProductById,
  getProducts,
} from '../controllers/productController.js'

//@route GET /api/products
//@desc get all products
//@access public
router.route('/').get(getProducts)

//@route GET /api/products/:id
//@desc get product by id
//@access public
router.route('/:id').get(getProductById)

export default router
