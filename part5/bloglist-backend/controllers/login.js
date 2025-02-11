const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const { newToken } = require('../utils/jwt_token')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({username})

  const passwordCorrect = user == null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const responseData = {
    token: newToken(user),
    username: user.username, 
    name: user.name
  }

  response.status(200).send(responseData)
})

module.exports = loginRouter