import { createSlice } from '@reduxjs/toolkit'

const loggedBlogAppUser = window.localStorage.getItem('loggedBlogAppUser')
const innitialState = loggedBlogAppUser ? JSON.parse(loggedBlogAppUser) : null

const userSlice = createSlice({
  name: 'user',
  initialState: innitialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    }, 
    removeUser(state, action) {
      window.localStorage.removeItem('loggedBlogAppUser')
      return null
    }
  }
})

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer
