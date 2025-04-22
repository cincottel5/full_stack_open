import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer'
import blogsService from '../services/blogs'
import { updateBlog } from "../reducers/blogReducer"

export const useBlog = (blog) => {
  const [blogLikes, setBlogLikes] = useState(blog.likes)
  const [blogComments, setBlogComments] = useState(blog.comments)

  const dispatch = useDispatch()

  const likeBlogHandle = async () => {
    blog.likes = blog.likes + 1
    // const likes = blogLikes + 1
    // const upatedBlog = {...blog, likes}
    await updateBlog()
    setBlogLikes(blog.likes)

    // try {
    //   await blogsService.update(upatedBlog)
    //   setBlogLikes(likes)
    // } catch (err) {
    //   console.log(err)
    // }
  }

  const addCommentHandle = async (comment) => {
    try {
      await blogsService.addComment(blog.id, comment)
      setBlogComments([...blogComments, comment])
    }
    catch (err) {
      console.log(err)
    }
  }

  const updateBlog = async () => {
    try {
      await blogsService.update(blog)
    }
    catch (err) {
      console.log(err)
    }
  }

  const removeBlogHandler = async () => {
    if (!confirm(`Remove blog ${blog.title} by ${blog.author}`)) return
    dispatch(deleteBlog(blog.id))
  }

  const isRemovable = () => 
    useSelector(({user}) => user.username === blog.user?.username )

  return {
    blogLikes, 
    blogComments,
    likeBlogHandle,
    removeBlogHandler,
    addCommentHandle,
    isRemovable
  }
}

export default useBlog