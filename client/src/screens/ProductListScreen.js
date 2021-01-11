import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts, deleteProduct } from '../redux/actions/productActions'

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productDelete = useSelector(state => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductandler = () => {
    // create products
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <button
            className='my-3 btn btn-outline-success'
            onClick={createProductandler}
          >
            <i className='fas fa-plus' /> Create Product
          </button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className='table-sm text-center'
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>STOCK</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>&#x20B9;{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{product.countInStock}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit' />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className='fas fa-trash' />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ProductListScreen
