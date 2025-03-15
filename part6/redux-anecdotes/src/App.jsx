import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAnecdotesState } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'
import Anecdotes from './components/Anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()

  const hook = () => {
    anecdoteService.getAll().then( anecdotes => {
      dispatch(setAnecdotesState(anecdotes))
    })
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  )
}

export default App