import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const notificationRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedBlogAppUser = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedBlogAppUser) {
      const user = JSON.parse(loggedBlogAppUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    location.reload()
  }

  const addBlog = newBlog => {
    setBlogs(blogs.concat(newBlog))
    notificationRef.current.displayMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`, true)
    blogFormRef.current.toggleVisibility()
  }

  const removeBlog = blogId => {
    setBlogs(blogs.filter(x => x.id !== blogId))
  }

  const sortBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const userInfo = () => (
    <div>
      <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
    </div>
  )

  const blogList = () => (
    <div>
      {sortBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} removeBlog={removeBlog}/>
      )}
    </div>
  )

  const loggedInView = () => (
    <>
      <h2>blogs</h2>
      <Notification ref={notificationRef}></Notification>
      { userInfo() }

      <Toggable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog}></BlogForm>
      </Toggable>
      { blogList() }
    </>
  )

  return (
    <div>
      { user === null
        ? <LoginForm setUser={setUser}/>
        : loggedInView()
      }
    </div>
  )
}

export default App