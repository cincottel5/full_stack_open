import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import LoginForm from "./components/LoginForm"
import NewBook from "./components/NewBook"
import Recommendations from "./components/Recommendations"
import Notification from "./components/Notification"
import { Route, Routes, Navigate, useNavigate} from 'react-router-dom'
import { useApolloClient, useSubscription } from "@apollo/client"
import { useDispatch } from "react-redux"
import { BOOK_ADDED, ALL_BOOKS } from "./utils/queries"
import { notify } from "./reducers/notificationReducer"

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = a => {
    let seen = new Set()

    return a.filter(item => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  //cache.updateQuery( query, ({ allBooks}) => ({ allBooks: uniqByName(allBooks.concat(addedBook))}))
  cache.updateQuery(query, (data) => { 
    return { allBooks: uniqByName((data?.allBooks||[]).concat(addedBook))}
   })
  //({ allBooks }) => ({ allBooks: uniqByName((allBooks||[]).concat(addedBook))}))
  //   query, 
  //   (cachedData) => {
  //   console.log('cached data', cachedData)
  //   const allBooks = cachedData ? cachedData.allBooks : []
  //   return { allBooks: uniqByName(allBooks.concat(addedBook))}
  // })

    //({ allBooks: uniqByName(allBooks.concat(addedBook))}))
}

const App = () => {
  const dispatch = useDispatch()
  const client = useApolloClient()
  const navigate = useNavigate()
  const [token, setToken] = useState(null)
  const [selectedGenre, setSelectedGenre] = useState(null)

  const renderNavByToken = () => {
    if (token) return (
      <>
        <button onClick={() => navigate('/add')}>add book</button>
        <button onClick={() => navigate('/recomendations')}>recommended</button>
        <button onClick={logout}>logout</button>
      </>
    )

    return <button onClick={() => navigate('/login')}>login</button> 
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log('data from subscription', data)
      console.log('client from subscription', client)
      try {
        const addedBook = data.data.bookAdded
        dispatch(notify(`${addedBook.title} added`))
        updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
      }
      catch (err) {
        console.log(err)
        notify(err)
      }
    }
  })

  const renderRouteByToken = () => {
    if (token) return(
      <>
        <Route path="/add" element={<NewBook selectedGenre={selectedGenre}/>}/>
        <Route path="/recomendations" element={<Recommendations token={token}/>}/>
      </>
    ) 

    return <Route path="/login" element={<LoginForm setToken={setToken}/>}/>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <nav>
        <button onClick={() => navigate('/authors')}>authors</button>
        <button onClick={() => navigate('/books')}>books</button>
        {renderNavByToken()}
      </nav>

      <Notification/>

      <Routes>
        <Route path="/authors" element={<Authors token={token}/>}/>
        <Route path="/books" element={<Books selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre}/>}/>
        {renderRouteByToken()}
        <Route path="*" element={<Navigate to="/authors" replace/>}/>
      </Routes>
    </div>
  )
}

export default App;
