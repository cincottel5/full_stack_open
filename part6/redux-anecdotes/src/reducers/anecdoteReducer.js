import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

export const initializeAnecdotes = createAsyncThunk(
  'anecdotes/getAll',
  async (thunkApi) => {
    const anecdotes = await anecdoteService.getAll()
    return anecdotes
  }
)

export const createAnecdote = createAsyncThunk(
  'anecdotes/createAnecdote',
  async (content, thunkApi) => {
    const newNote = await anecdoteService.createNew(content)
    return newNote
  }
)

export const updateAnecdote = createAsyncThunk(
  'anecdotes/updateAnecdote',
  async (anecdote, thunkApi) => {
    const updateAnecdote = await anecdoteService.updateAnecdote(anecdote)
    return updateAnecdote
  }
)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initializeAnecdotes.fulfilled, (state, action) => {
      return action.payload
    }),
    builder.addCase(createAnecdote.fulfilled, (state, action) => {
      state.push(action.payload)
    }),
    builder.addCase(updateAnecdote.fulfilled, (state, action) => {
      const id = action.payload.id 
      
      return state.map(anecdote => anecdote.id === id
        ? action.payload 
        : anecdote)
    })
  }
})

export default anecdoteSlice.reducer