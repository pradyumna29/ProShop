import * as ActionTypes from './types'
import axios from 'axios'

export const listProducts = () => async dispatch => {
  try {
    dispatch({ type: ActionTypes.PRODUCT_LIST_REQUEST })
    const { data } = await axios.get('/api/products')
    dispatch({
      type: ActionTypes.PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ActionTypes.PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listProductDetail = id => async dispatch => {
  try {
    dispatch({ type: ActionTypes.PRODUCT_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({
      type: ActionTypes.PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ActionTypes.PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteProduct = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: ActionTypes.PRODUCT_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/products/${id}`, config)

    dispatch({
      type: ActionTypes.PRODUCT_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: ActionTypes.PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ActionTypes.PRODUCT_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/products`, {}, config)

    dispatch({
      type: ActionTypes.PRODUCT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ActionTypes.PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
