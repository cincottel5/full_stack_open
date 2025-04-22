import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import useField from '../hooks/field'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// query solution
import blogService from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
// end query solution

// redux solution
import { createBlog } from '../reducers/blogReducer'
// end redux solution

const BlogForm = () => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const dispatch = useDispatch()

  // query solution
  // const queryClient = useQueryClient()

  // const newBlogMutation = useMutation({
  //   mutationFn: blogService.create,
  //   onSuccess: newBlog => {
  //     const blogs = queryClient.getQueryData(['blogs'])
  //     queryClient.setQueriesData(['blogs'], blogs.concat(newBlog))
  //     refreshForm()
  //     dispatch(showNotification(`Blog ${newBlog.title} added`, true))
  //   }
  // })
  // end query solution

  const refreshForm = () => {
    title.setValue('')
    author.setValue('')
    url.setValue('')
    
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const blog = { title: title.value, author: author.value, url: url.value }

    // query solution
    //newBlogMutation.mutate(blog)
    // end query solution

    // redux solution
    dispatch(createBlog(blog))
    refreshForm()
    dispatch(showNotification(`Blog ${blog.title} added`, true))
    // end redux solution
    
  }

  return (
    <div className='w-50 me-auto'>
      <h3>create new</h3>

      <Form onSubmit={onSubmit}>
        <Form.Group className='mb-3' controlId='blog-input-title'>
          <Form.Label>Title</Form.Label>
          <Form.Control {...title.asInput()}></Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='blog-input-title'>
          <Form.Label>Author</Form.Label>
          <Form.Control {...author.asInput()}></Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='blog-input-title'>
          <Form.Label>Url</Form.Label>
          <Form.Control {...url.asInput()}></Form.Control>
        </Form.Group>

        <Button variant='outline-success' type='submit'>Create</Button>
      </Form>
    </div>
  )
}

export default BlogForm
