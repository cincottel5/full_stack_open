import deepFreeze from "deep-freeze"
import filterReducer from "./filterReducer"

describe('Filter reducer', () => {
  
  test('is empty at start', () => {
    const action = { type: 'TEST' }
    const newState = filterReducer(undefined, action)
    expect(newState).toBe('')
  })

  test('change action modify state', () => {
    const action = { type: 'filter/filterChange', payload: 'test' }
    
    const state = ''
    deepFreeze(state)

    const newState = filterReducer(state, action)
    expect(newState).toBe(action.payload)
  })
})