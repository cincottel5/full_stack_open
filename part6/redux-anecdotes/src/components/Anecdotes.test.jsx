import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Anecdotes from './Anecdotes'
import { Provider } from 'react-redux'
import setupStore from '../store'

describe('<Anecdotes />', () => {
  let store
  let defaultState = {
    anecdotes: [
      { id: '1', content: 'Anecdote 1', votes: 0 },
      { id: '2', content: 'Anecdote 2', votes: 5 }
    ]
  }

  beforeEach(() => {
    store = setupStore(defaultState)
  })

  test('renders anecdotes', async () => {
    render(
      <Provider store={store}>
        <Anecdotes />
      </Provider>
    )

    screen.getByText(defaultState.anecdotes[0].content)
    screen.getByText(defaultState.anecdotes[1].content)
  })


})