import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  type: null
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        displayNotification(state, action) {
            state.message = action.payload.message
            state.type = action.payload.type
          },
        removeNotification() {
          return initialState
        }
    }
})

export const setNotification = (notification, seconds, type) => {
    return async (dispatch) => {
        dispatch(displayNotification({message: notification, type}))
        setTimeout(() => {
            dispatch(removeNotification())
        }, seconds * 1000)
    }
}

export const { displayNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer