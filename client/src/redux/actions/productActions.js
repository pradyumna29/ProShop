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
