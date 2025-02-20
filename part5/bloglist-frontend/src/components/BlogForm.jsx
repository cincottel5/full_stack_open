import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const refreshForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const onSubmit = event => {
    event.preventDefault()

    blogService
      .create({ title, author, url })
      .then( returnedBlog => {
        addBlog(returnedBlog)
        refreshForm()
      })
  }

  const handleTitleChange = event => setTitle(event.target.value)
  const handleAuthorChange = event => setAuthor(event.target.value)
  const handleUrlChange = event => setUrl(event.target.value)

  return (
    <>
      <h2>create new</h2>

      <form onSubmit={onSubmit}>
        <div>title: <input id='blog-input-title' value={title} onChange={handleTitleChange}></input></div>
        <div>author: <input id='blog-input-author' value={author} onChange={handleAuthorChange}></input></div>
        <div>url: <input id='blog-input-url' value={url} onChange={handleUrlChange}></input></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm