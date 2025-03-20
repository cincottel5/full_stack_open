import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createAnecdote } from '../services/anecdotes'
import { useNotificationDispatch } from '../context/NotificationContext'
 
const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueriesData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch({ type: 'SET', payload: `anecdote ${newAnecdote.content} created` })
    },
    onError: (error) => {
      console.log(error)
      if (error.code === 'ERR_BAD_REQUEST')
        dispatch({ type: 'SET', payload: 'too short anecdote, must have length 5 or more'})
      else 
        dispatch({ type: 'SET', payload: error.message})
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
