import { render, screen } from '@testing-library/react'
import deepFreeze from 'deep-freeze'
import anecdoteReducer, { updateAnecdote, createAnecdote } from './anecdoteReducer'
import anecdoteService from '../services/anecdotes'
import setupStore from '../store'

describe('anecdoteReducer', () => {
  let store

  vi.mock('../services/anecdotes')

  const initialState = { 
    anecdotes: [
      { id: 1, content: 'test 1', votes: 10 },
      { id: 2, content: 'test 2', votes: 5 }
    ] 
  }

  beforeEach (() => {
    store = setupStore(initialState)
  })

  test('return proper state at start', () => {
    const newState = store.getState().anecdotes

    expect(newState).toHaveLength(2)
  })

  test('vote increments', async () => {
    const anecdoteToUpdate = initialState.anecdotes[0]
    const updatedAnecdote = { ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1 }

    anecdoteService.updateAnecdote.mockResolvedValue(updatedAnecdote)
    await store.dispatch(updateAnecdote(updateAnecdote))
    const newState = store.getState().anecdotes

    expect(newState[0].votes).toBe(11)
    expect(newState[1].votes).toBe(5)
  })

  test('create adds an element', async () => {
    const newContent = 'Test note created'
    anecdoteService.createNew.mockResolvedValue({id: 3, content: newContent, votes: 0})

    await store.dispatch(createAnecdote(newContent))
    const newState = store.getState().anecdotes

    expect(newState).toHaveLength(3)
    expect(newState.map(x=>x.content)).toContainEqual(newContent)
  })
})