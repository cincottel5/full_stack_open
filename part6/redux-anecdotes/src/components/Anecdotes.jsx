import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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

const anecdoteSortFn = (a, b) => b.votes - a.votes

const Anecdotes = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') return [...anecdotes].sort(anecdoteSortFn)

    const anecdotesFilter = anecdote =>
      new RegExp(filter, 'i').test(anecdote.content)

    return anecdotes.filter(anecdotesFilter).sort(anecdoteSortFn)
  })

  const addVote = (anecdote) => {
    dispatch(setNotification(`You voted '${anecdote.content}'`))
    dispatch(voteAnecdote(anecdote.id))
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