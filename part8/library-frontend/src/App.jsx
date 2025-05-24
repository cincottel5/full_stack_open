import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import { Route, Routes, Navigate, useNavigate} from 'react-router-dom'

const App = () => {
  const navigate = useNavigate()

  return (
    <div>
      <nav>
        <button onClick={() => navigate('/authors')}>authors</button>
        <button onClick={() => navigate('/books')}>books</button>
        <button onClick={() => navigate('/add')}>add book</button>
      </nav>

      <Routes>
        <Route path="/authors" element={<Authors/>}/>
        <Route path="/books" element={<Books/>}/>
        <Route path="/add" element={<NewBook/>}/>
        <Route path="*" element={<Navigate to="/authors" replace/>}/>
      </Routes>
    </div>
  )
}

export default App;
