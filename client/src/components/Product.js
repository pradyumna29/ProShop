import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import PropTypes from 'prop-types'

const Product = ({ product }) => {
  // destructuring to take out product from props
  return (
    <Card className='my-3 p-2 rounded'>
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </a>
      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </a>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as='h3'>&#x20B9;{product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
}

export default Product
