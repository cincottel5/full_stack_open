import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import LoginForm from "./components/LoginForm"
import NewBook from "./components/NewBook"
import Recommendations from "./components/Recommendations"
import Notification from "./components/Notification"
import { Route, Routes, Navigate, useNavigate} from 'react-router-dom'
import { useApolloClient } from "@apollo/client"

const App = () => {
  const navigate = useNavigate()
  const client = useApolloClient()
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
