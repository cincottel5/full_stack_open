import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  }
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const showNotification = (message, isSuccess) => {
  return async dispatch => {
    dispatch(setNotification({message, isSuccess}))

    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }
}