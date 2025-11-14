import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        displayNotification(state, action) {
            state = action.payload
            return state
        },
        removeNotification() {
            return ''
        }
    }
})

export const setNotification = (notification, seconds) => {
    return async (dispatch) => {
        dispatch(displayNotification(notification))
        setTimeout(() => {
            dispatch(removeNotification())
        }, seconds * 1000)
    }
}

export const { displayNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer