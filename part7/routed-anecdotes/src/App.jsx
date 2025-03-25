import { useState } from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'

import Menu from './components/Menu'
import About from './components/About'
import Footer from './components/Footer'
import Anecdote from './components/Anecdote'
import CreateNew from './components/CreateNew'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import anecdoteService from './services/anecdotes'

const App = () => {
  const [anecdotes, setAnecdotes] = useState(anecdoteService.getAll())
  const [notification, setNotification] = useState('')

  const showNotification = message => {
    setNotification(message)

    setTimeout(() => {
      setNotification('')
    }, 5000);
  }

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    showNotification(`a new anecdote ${anecdote.content} created!`)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification}/>
      
      <Routes>
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote}/>}/>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />}></Route>
        <Route path="/create" element={<CreateNew addNew={addNew} />}/>
        <Route path="/about" element={<About />}/>
      </Routes>
    
      <Footer />
    </div>
  )
}

export default App
