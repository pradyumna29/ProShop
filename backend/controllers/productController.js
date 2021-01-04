import asyncHandler from 'express-async-handler'
import Product from '../models/Product.js'

//@route GET /api/products
//@desc get all products
//@access public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})

  res.json(products)
})

//@route GET /api/products/:id
//@desc get product by id
//@access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProducts, getProductById }
