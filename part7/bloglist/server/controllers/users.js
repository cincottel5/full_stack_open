const bcrypt = require('bcrypt')
const userRoutes = require('express').Router()
const User = require('../models/user')
const { throwError } = require('../utils/throw_helper')
const messages = require('../utils/messages')

userRoutes.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { likes: 0, user: 0 })
  response.json(users)
})

userRoutes.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('blogs')
  response.json(user)
})

userRoutes.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (password === undefined || password.length < 3)
    throwError('ValidationError', messages.users.errors.passwordLength)

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = userRoutes
