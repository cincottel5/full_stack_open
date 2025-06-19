import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from 'react-router-dom'
import App from "./App"
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import setupStore from './store'
import { Provider } from 'react-redux'

const authLink = setContext((_, { headers}) => {
  const token = localStorage.getItem('book-app-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}`: null
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={setupStore()}>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </Provider>
);
