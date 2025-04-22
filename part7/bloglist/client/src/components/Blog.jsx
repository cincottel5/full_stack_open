import Proptypes from 'prop-types'
import { Link } from 'react-router-dom'

// react query solution
import { useQueryClient, useMutation } from '@tanstack/react-query'
// end react query solution

//redux solution
import { useDispatch } from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer'
// end redux solution 

const propTypes = {
  blog: Proptypes.any.isRequired
}

const Blog = ({ blog }) => {
  return (
    <>
      <Link to={`/blogs/${blog.id}`} className='link-underline link-underline-opacity-0 '>
        <span className="blog-title">{blog.title}</span>{' '}
        <span className="blog-author">{blog.author}</span>
      </Link>
    </>
  )
}

Blog.propTypes = propTypes

export default Blog
