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
        setNotification(state, action) {
            state = action.payload
            return state
        },
        removeNotification() {
            return ''
        }
    }
})

export const { displayNotification, setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer