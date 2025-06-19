import { useMutation } from "@apollo/client"
import { useState, useEffect } from "react"
import { LOGIN } from "../utils/queries"
import { useDispatch } from "react-redux"
import { notify } from "../reducers/notificationReducer"
import PropTypes from 'prop-types'

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const [login, { data }] = useMutation(LOGIN, {
    onError: error => dispatch(notify(error.message))
  })

  const hook = () => {
    if (!data) return

    const token = data.login.value
    setToken(token)
    localStorage.setItem('book-app-token', token)
  }

  useEffect(hook, [data])

  const submit = event => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input value={password} type="password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  setToken: PropTypes.any.isRequired
}

export default LoginForm
