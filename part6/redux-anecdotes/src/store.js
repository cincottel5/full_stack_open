import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import noticationReducer from './reducers/notificationReducer'

const setupStore = (preloadedState) => {
  return configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      filter: filterReducer,
      notification: noticationReducer
    },
    preloadedState
  })
}

export default setupStore