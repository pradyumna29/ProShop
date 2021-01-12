import * as ActionTypes from '../actions/types'
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ActionTypes.PRODUCT_LIST_REQUEST:
      return { loading: true, ...state }
    case ActionTypes.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }
    case ActionTypes.PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case ActionTypes.PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state }
    case ActionTypes.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case ActionTypes.PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.PRODUCT_DELETE_REQUEST:
      return { loading: true }
    case ActionTypes.PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case ActionTypes.PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.PRODUCT_CREATE_REQUEST:
      return { loading: true }
    case ActionTypes.PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case ActionTypes.PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case ActionTypes.PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case ActionTypes.PRODUCT_UPDATE_REQUEST:
      return { loading: true }
    case ActionTypes.PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case ActionTypes.PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case ActionTypes.PRODUCT_UPDATE_RESET:
      return { product: {} }
    default:
      return state
  }
}
