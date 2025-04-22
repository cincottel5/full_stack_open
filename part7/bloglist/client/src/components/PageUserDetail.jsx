import { useState, useEffect } from "react"
import { useMatch } from "react-router-dom"
import usersService from '../services/users'
import Loading from './Loading'

const PageUserDetail = () => {
  const [user, setUser] = useState(null)  
  const match = useMatch('/users/:id')

  useEffect(() => {
    if (!match) return 

    usersService.getById(match.params.id).then(result => {
      setUser(result)
    })
  }, [])

  if (!user) return <Loading/>

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        { user.blogs.map(blog => 
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </>
  )
}

export default PageUserDetail