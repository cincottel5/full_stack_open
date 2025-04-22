import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    },
    updateBlog(state, action) {
      const blogs = state.map(blog => blog.id !== action.payload.id ? blog : action.payload )
      return blogs
    },
    setBlogsState(state, action) {
      return action.payload
    } 
  }
})

export const { appendBlog, setBlogsState, removeBlog, updateBlog } = blogSlice.actions
export default blogSlice.reducer

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogsState(blogs))
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    const res = await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

