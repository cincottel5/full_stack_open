import loginService from '../services/login'
import Notification from './Notification'
import { showNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import useField from '../hooks/field'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const credentials = { username: username.value, password: password.value }
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      dispatch(setUser(user))
      username.setValue('')
      password.setValue('')
    } catch (exeption) {
      dispatch(showNotification('error', false))
    }
  }

  return (
    <div className='d-flex justify-content-center pt-4 '>
      <div className='w-50'>
        <h2>log in to application</h2>
        <Notification />

        <Form onSubmit={handleLogin}>
          <Form.Group className='mb-3' controlId='blog-input-title'>
              <Form.Label>Username</Form.Label>
              <Form.Control {...username.asInput()}></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='blog-input-title'>
              <Form.Label>password</Form.Label>
              <Form.Control {...password.asInput()}></Form.Control>
            </Form.Group>

            <Button variant='success' type='submit'>Login</Button>
        </Form>
      </div>
    </div>
    
  )
}

export default LoginForm
