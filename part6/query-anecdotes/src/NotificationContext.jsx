import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'NEW':
      return `anecdote '${action.payload.content}' added`
    case 'VOTE':
        return `anecdote '${action.payload.content}' voted`
    case 'HIDE':
        return null
    case 'ERROR':
        return `too short anecdote, must have length 5 or more`
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, 0)

  return (
    <NotificationContext.Provider value={{ notification, notificationDispatch }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext