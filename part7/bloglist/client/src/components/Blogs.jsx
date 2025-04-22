import Blog from './Blog'
import ListGroup from 'react-bootstrap/ListGroup'

// query solution
// import blogService from '../services/blogs'
// import { useQuery } from '@tanstack/react-query'
// import Loading from './Loading'
// end query solution

// redux solution
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { useEffect } from 'react'
// end redux solution

const sortBlogsFn = (a, b) => b.likes - a.likes

const Blogs = () => {
  // query solution
  // const result = useQuery({
  //   queryKey: ['blogs'],
  //   queryFn: blogService.getAll
  // })

  // if (result.isLoading) {
  //   return <Loading/>
  // }

  // const blogs = result.data
  // end query solution

  // redux solution
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const blogs = useSelector(state => state.blogs)
  // end redux solution

  const sortedBlogs = [...blogs].sort(sortBlogsFn)

  return (
    <ListGroup>
      {sortedBlogs.map((blog) => (
        <ListGroup.Item key={blog.id}>
          <Blog  blog={blog}/>
        </ListGroup.Item>  
      ))}
    </ListGroup>
  )
}

export default Blogs