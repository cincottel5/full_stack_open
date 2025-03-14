import { render, screen } from '@testing-library/react'
import deepFreeze from 'deep-freeze'
import anecdoteReducer from './anecdoteReducer'

describe('anecdoteReducer', () => {

  const initialState = [
    { id: 1, content: 'test 1', votes: 10 },
    { id: 2, content: 'test 2', votes: 5 }
  ]

  test('return proper state when state is undefined', () => {
    const action = { type: 'TEST' }

    const newState = anecdoteReducer(undefined, action)
    expect(newState).toHaveLength(6)
  })

  test('vote increments', () => {
    const action = { type: 'anecdotes/voteAnecdote', payload:  1  }
    const state = initialState

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    const [anecdote1, anecdote2] = newState
    expect(anecdote1.votes).toBe(11)
    expect(anecdote2.votes).toBe(5)
  })

  test('create adds an element', () => {
    const action = {
      type: 'anecdotes/createAnecdote',
      payload: 'test new'
    }

    const state = initialState
    deepFreeze(state)

    const newState = anecdoteReducer(state, action)
    expect(newState).toHaveLength(3)
    expect(newState.map(x=>x.content)).toContainEqual(action.payload)
  })
})