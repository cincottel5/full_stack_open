import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import setStore from '../reducers/store'

const preloadedState = {
  user: {
      "token": "xxxxxxxxxxx",
      "username": "test",
      "name": "test"
  }
}

export const queryWrapper = element => 
  render(<QueryClientProvider client={new QueryClient()}>{element}</QueryClientProvider>)

export const reduxWrapper = element => 
  render(<Provider store={setStore(preloadedState)}>{element}</Provider>)

export const queryAndReduxWrapper = element => 
  queryWrapper(<Provider store={setStore(preloadedState)}>{element}</Provider>)
