import { useRef } from 'react'
import Blogs from './Blogs'
import Toggable from './Toggable'
import BlogForm from './BlogForm'

const PageBlogs = () => {
  const blogFormRef = useRef()

  return (
    <>
      <Toggable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm/>
      </Toggable>
      <Blogs/>
    </>
  )
}

export default PageBlogs