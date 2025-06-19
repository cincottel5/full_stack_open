import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'

const setupStore = () => {
  const reducer = {
    notification: notificationReducer
  }

  return configureStore({ reducer })
}

export default setupStore