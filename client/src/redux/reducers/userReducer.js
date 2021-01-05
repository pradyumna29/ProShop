import * as ActionTypes from '../actions/types.js'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN_REQUEST:
      return { loading: true }
    case ActionTypes.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case ActionTypes.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case ActionTypes.USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterreducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.USER_REGISTER_REQUEST:
      return { loading: true }
    case ActionTypes.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case ActionTypes.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userDetailsreducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case ActionTypes.USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case ActionTypes.USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case ActionTypes.USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
