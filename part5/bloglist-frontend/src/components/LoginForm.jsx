import { useState, useEffect, useRef } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './Notification'

const LoginForm = ({ setUser }) => {

  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const notificationRef = useRef()

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exeption) {
      notificationRef.current.displayMessage('Wrong username or password', false)
      console.log(exeption)
    }
  }

  return (
    <>
      <h2>log in to application</h2>
      <Notification ref={notificationRef} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm