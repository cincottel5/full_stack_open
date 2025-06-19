import { createSlice } from '@reduxjs/toolkit'

const notificationslice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotificationState(state, action) {
      return action.payload
    }
  }
})

export const { setNotificationState } = notificationslice.actions
export default notificationslice.reducer

export const notify = (message, seconds=5) => {
  return async dispatch => {
    dispatch(notificationslice.actions.setNotificationState(message))
    await new Promise(resolve => setTimeout(resolve, seconds*1000))
    dispatch(notificationslice.actions.setNotificationState(null))
  }
}