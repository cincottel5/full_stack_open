import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../utils/queries'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'

const useBooks = (genre) => {
  const dispatch = useDispatch()

  const { loading, error, data } = useQuery(
    ALL_BOOKS, { variables: { genre } })

  useEffect(() => {
      if (error)
        dispatch(notify(error.message))
    }, [error])

  return {
    loading, 
    error, 
    data
  }
}

export default useBooks