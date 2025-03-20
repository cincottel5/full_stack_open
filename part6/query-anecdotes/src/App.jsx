import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './services/anecdotes'

const App = () => {
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: updatedAnecdote => {
      queryClient.setQueriesData(['anecdotes'], 
        anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id 
          ? updatedAnecdote
          : anecdote
        ))
    }
  })

  const { isPending, isError, data, error} = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if (isPending)
    return <div>loading data</div>

  if (isError)
    return <div>anecdote service not available due to problems in server</div>

  const handleVote = (anecdote) => {
    const updateAnecdote = {...anecdote, votes: anecdote.votes + 1}
    updateAnecdoteMutation.mutate(updateAnecdote)
  }

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
