import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetail } from '../redux/actions/productActions'
import { USER_EDIT_RESET } from '../redux/actions/types'
import FormContainer from '../components/FormContainer'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id
  const [price, setPrice] = useState(0)
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)

  const { loading, error, product } = productDetails

  useEffect(() => {
    if (!product.name || product._id !== productId) {
      dispatch(listProductDetail(productId))
    } else {
      setName(product.name)
      setPrice(product.price)
      setCategory(product.category)
      setBrand(product.brand)
      setDescription(product.description)
      setImage(product.image)
      setCountInStock(product.countInStock)
    }
  }, [product, dispatch, productId, history])

  const submitHandler = e => {
    e.preventDefault()
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                value={name}
                placeholder='Enter your name'
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                value={price}
                placeholder='Enter price'
                onChange={e => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                value={image}
                placeholder='Enter image url'
                onChange={e => setImage(e.target.image)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                value={brand}
                placeholder='Enter brand'
                onChange={e => setBrand(e.target.brand)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='text'
                value={countInStock}
                placeholder='Enter Count In Stock'
                onChange={e => setCountInStock(e.target.countInStock)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                value={category}
                placeholder='Enter category'
                onChange={e => setCategory(e.target.category)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                value={description}
                placeholder='Enter description'
                onChange={e => setDescription(e.target.description)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='dark'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
