import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    clearNotification(state, action) {
      return ''
    },
    setNotificationState(state, action) {
      return action.payload
    }
  },
})

export const setNotification = (message, secondsDelay) => {
  return async dispatch => {
    dispatch(setNotificationState(message))
    await new Promise(resolve => setTimeout(resolve, secondsDelay * 1000))
    dispatch(clearNotification())
  }
}

export const { clearNotification, setNotificationState } = notificationSlice.actions
export default notificationSlice.reducer