import * as ActionTypes from './types'
import axios from 'axios'

export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: ActionTypes.USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    dispatch({
      type: ActionTypes.USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: ActionTypes.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => dispatch => {
  localStorage.removeItem('userInfo')
  dispatch({ type: ActionTypes.USER_LOGOUT })
  dispatch({ type: ActionTypes.USER_DETAILS_RESET })
  dispatch({ type: ActionTypes.ORDER_LIST_MY_RESET })
  dispatch({ type: ActionTypes.USER_LIST_RESET })
}

export const register = (name, email, password) => async dispatch => {
  try {
    dispatch({
      type: ActionTypes.USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )

    dispatch({
      type: ActionTypes.USER_REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: ActionTypes.USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: ActionTypes.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserdetails = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: ActionTypes.USER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch({
      type: ActionTypes.USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ActionTypes.USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUserProfile = user => async (dispatch, getState) => {
  try {
    dispatch({
      type: ActionTypes.USER_UPDATE_PROFILE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/profile`, user, config)

    dispatch({
      type: ActionTypes.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ActionTypes.USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ActionTypes.USER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users`, config)

    dispatch({
      type: ActionTypes.USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ActionTypes.USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const deleteUser = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: ActionTypes.USER_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/users/${id}`, config)

    dispatch({
      type: ActionTypes.USER_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: ActionTypes.USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const editUser = user => async (dispatch, getState) => {
  try {
    dispatch({
      type: ActionTypes.USER_EDIT_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/${user._id}`, user, config)

    dispatch({
      type: ActionTypes.USER_EDIT_SUCCESS,
    })
    dispatch({
      type: ActionTypes.USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ActionTypes.USER_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
