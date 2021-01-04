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
