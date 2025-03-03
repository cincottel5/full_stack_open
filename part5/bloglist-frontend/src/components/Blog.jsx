import  Toggable from './Toggable'
import { useState, useEffect } from 'react'
import BlogService from '../services/blogs'
import blogs from '../services/blogs'

const Blog = ({ blog, removeBlog, removable }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [blogLikes, setBlogLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toogleVisibility = () => setDetailsVisible(!detailsVisible)

  const likeClickHandle = async () => {
    blog.likes = blog.likes + 1
    try {
      await BlogService.update(blog)
      setBlogLikes(blog.likes)
    }
    catch(err) {
      console.log(err)
    }
  }

  const removeClickHandler = async () => {
    try {

      if (!confirm(`Remove blog ${blog.title} by ${blog.author}`)) return
      try {
        const response = await BlogService.remove(blog.id)
        removeBlog(blog.id)
      }
      catch (err) {
        alert('There is a problem in your request')
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const renderRemoveButton = () => {
    return removable
    ? <button onClick={removeClickHandler}>remove</button>
    : ''
  }

  const detailsRender = () => (
    <>
      <div className="blog-url">{blog.url}</div>
      <div className='blog-likes'>likes: {blogLikes} <button type='button' className='like-btn' onClick={likeClickHandle}>like</button></div>
      <div>{blog.user?.name}</div>
      {renderRemoveButton()}
    </>
  )

  return (
    <div style={blogStyle}>
      <span className='blog-title'>{blog.title}</span> <span className='blog-author'>{blog.author}</span>
      <button onClick={toogleVisibility}>{detailsVisible ? 'hide' : 'view'}</button>
      { detailsVisible ? detailsRender() : '' }
    </div>
  )

}

export default Blog