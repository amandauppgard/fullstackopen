import { createSlice } from "@reduxjs/toolkit"
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from "./notificationReducer"

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initialize(state, action) {
      return action.payload
    },
    login(state, action) {
      return action.payload
    },
    logout(state, action) {
      return null
    },
  }
})

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    const user = JSON.parse(loggedUserJSON)

    if (loggedUserJSON) {
      blogService.setToken(user.token)
      dispatch(initialize(user))
    }
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);

      dispatch(login(user))
      dispatch(setNotification(`User ${user.username} was successfully logged in`, 5, 'success'))
    }
    catch {
      dispatch(setNotification('Wrong credentials', 5, 'error'))
    }
  }
}

export const logoutUser = (user) => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(logout())
    dispatch(setNotification(`user ${user.username} was logged out`, 5, "success"));
  }
}

export const { login, logout, initialize } = userSlice.actions
export default userSlice.reducer