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

//@route DELETE /api/products/:id
//@desc delete product
//@access private, admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//@route post /api/products/
//@desc create product
//@access private, admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpeg',
    brand: 'sample brand',
    category: 'sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

//@route PUT /api/products/:id
//@desc update product
//@access private, admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    description,
    category,
    brand,
    countInStock,
  } = req.body
  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.image = image
    product.category = category
    product.description = description
    product.brand = brand
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
}
