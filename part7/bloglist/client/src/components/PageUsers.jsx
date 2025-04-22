import usersService from '../services/users'
import { useQuery } from '@tanstack/react-query'
import Loading from './Loading'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const PageUsers = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll
  })

  if (result.isLoading) return <Loading/>

  const users = result.data

  return (
    <div>
      <h2>Users</h2>

      <Table responsive striped>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          { users.map(user => 
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}  
        </tbody>
      </Table>
    </div>
  )
}

export default PageUsers