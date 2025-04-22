import useField from '../hooks/field'

const BlogCommentForm = ({addCommentHandle}) => {
  const comment = useField('text')

  const onSubmit = event => {
    event.preventDefault()
    addCommentHandle(comment.value)
    comment.clear()
  }

  return (
    <form onSubmit={onSubmit}>
      <input {...comment.asInput()}/>
      <button type='submit'>add comment</button>
    </form>
  )
}

export default BlogCommentForm