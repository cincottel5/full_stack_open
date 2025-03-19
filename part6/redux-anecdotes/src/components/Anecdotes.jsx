import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { updateAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, voteClickHandler }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={voteClickHandler}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdoteSortFn = (a, b) => b.votes - a.votes

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') return [...anecdotes].sort(anecdoteSortFn)

    const anecdotesFilter = anecdote =>
      new RegExp(filter, 'i').test(anecdote.content)

    return anecdotes.filter(anecdotesFilter).sort(anecdoteSortFn)
  })

  const addVote = async anecdote => {
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    await dispatch(updateAnecdote(updatedAnecdote))
    dispatch(setNotification(`You voted '${updatedAnecdote.content}'`, 10))
    
  }

  return (
    <div>
      { anecdotes.map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          voteClickHandler={() => addVote(anecdote)}
        />
      )}
    </div>
  )
}

export default Anecdotes