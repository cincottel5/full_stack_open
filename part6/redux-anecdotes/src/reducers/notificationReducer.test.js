import deepFreeze from "deep-freeze"
import notificationReducer, { setNotification, setNotificationState, clearNotification } from "./notificationReducer"

describe('Notification reducer', () => {
  
  test('is empty at start', () => {
    const action = { type: 'TEST' }
    const newState = notificationReducer(undefined, action)
    expect(newState).toBe('')
  })

  test('change action modify state', async () => {
    const dispatch = vi.fn()
    const message = 'test notification'
    const secondsDelay = 1

    await setNotification(message, secondsDelay)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(setNotificationState(message))
    expect(dispatch).toHaveBeenCalledWith(clearNotification())
  })
})