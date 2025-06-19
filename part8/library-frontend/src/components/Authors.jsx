import { ALL_AUTHORS } from '../utils/queries' 
import { useQuery } from '@apollo/client'
import EditAuthor from './EditAuthor'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { useEffect } from 'react'

const Authors = ({token}) => {
  const dispatch = useDispatch()
  const { loading, error, data } = useQuery(ALL_AUTHORS)

  useEffect(()=> {
    if (error) 
      dispatch(notify(error.message))
  }, [error])

  const renderEdit = () => {
    if (!token) return null
    return <EditAuthor authors={authors}/>
  }

  if (loading) return <div>loading...</div>
  if (error) return <div>No data available</div>

  const authors = data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      { renderEdit() }
    </div>
  )
}

export default Authors
