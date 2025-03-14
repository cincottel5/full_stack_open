import deepFreeze from "deep-freeze"
import notificationReducer from "./notificationReducer"

describe('Notification reducer', () => {
  
  test('is empty at start', () => {
    const action = { type: 'TEST' }
    const newState = notificationReducer(undefined, action)
    expect(newState).toBe('Welcome')
  })

  test('change action modify state', () => {
    const action = { type: 'notification/setNotification', payload: 'test' }
    
    const state = ''
    deepFreeze(state)

    const newState = notificationReducer(state, action)
    expect(newState).toBe(action.payload)
  })
})