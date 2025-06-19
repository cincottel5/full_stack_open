import { useState, useEffect } from 'react'
import BookList from './BookList'
import useBooks from '../hooks/Books'
import PropTypes from 'prop-types'

const Books = ({selectedGenre, setSelectedGenre}) => {
  const [genres, setGenres] = useState(new Set())
  
  const { loading, error, data } = useBooks(selectedGenre)
  
  useEffect(() => {
    if (data?.allBooks == null || genres.size > 0) return 

    const reducer = (accum, current) => accum.concat(...current.genres)
    let genresArray = data.allBooks.reduce(reducer, [])
    
    setGenres(new Set([...genresArray]))
  }, [data])

  if (loading) return <div>loading...</div>
  if (error) return <div>No data available</div>

  const books = data.allBooks
  
  return (
    <div>
      <h2>books</h2>
     <BookList books={books}/>
      <div>
        {Array.from(genres).map(g =>
          <button key={g} type='button' onClick={() => setSelectedGenre(g)}>{g}</button>
        )}
        <button type='button' onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

Books.propTypes = {
  selectedGenre: PropTypes.any,
  setSelectedGenre: PropTypes.any
}

export default Books
