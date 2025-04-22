import { useDispatch } from 'react-redux'
import { removeUser } from '../reducers/userReducer'
import { useSelector } from 'react-redux'
import { Nav } from 'react-bootstrap'
import { ArrowRightCircle } from 'react-bootstrap-icons'

const UserInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(removeUser())
    location.reload()
  }

  return (
    <div>
       <Nav className='me-auto'>
        <Nav.Link href="#" as="span" className='nav-link'>
          {user.name} is logged-in
        </Nav.Link>
        <Nav.Link className='ms-4 p-0' >
          <button onClick={handleLogout} className='btn  btn-outline-primary m-0'>
            <ArrowRightCircle size={24} className='me-2'/>  
            Logout
          </button>
        </Nav.Link>
       </Nav>
       
    </div>
    
  )
}

export default UserInfo