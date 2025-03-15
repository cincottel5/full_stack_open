import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload 
      let anecdote = state.find(anecdote => anecdote.id === id)
      anecdote.votes = anecdote.votes + 1
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotesState(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, createAnecdote, setAnecdotesState } = anecdoteSlice.actions
export default anecdoteSlice.reducer