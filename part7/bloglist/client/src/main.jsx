import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import setStore from './reducers/store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={setStore()}>
    <QueryClientProvider client={new QueryClient()}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </Provider>
)
