import BookList from "./BookList"
import PropTypes from 'prop-types'
import useBooks from "../hooks/Books"
import { jwtDecode } from 'jwt-decode'

const Recommendations = ({ token }) => {
  const { favoriteGenre } = jwtDecode(token)
  const { loading, error, data } = useBooks(favoriteGenre)

  if (loading) return <div>loading...</div>
  if (error) return <div>No data available</div>

  const books = data.allBooks

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre {favoriteGenre}</p>
      <BookList books={books}/>
    </div>
  )
}

Recommendations.propTypes = {
  token: PropTypes.any.isRequired
}

export default Recommendations