import { Link } from 'react-router-dom'
import UserInfo from './UserInfo'
import { Navbar, Nav } from 'react-bootstrap'

const MainMenu = () => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant='dark'>
    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
    <Navbar.Collapse id="responsive-navbar-nav" className='container'>
      <Nav className='me-auto'>
        <Nav.Link href="#" as="span">
          <Link to='/blogs' className="nav-link" >Blogs</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          <Link to='/users' className="nav-link">Users</Link>
        </Nav.Link>
      </Nav>
      <UserInfo/>
    </Navbar.Collapse>
  </Navbar>
)

export default MainMenu