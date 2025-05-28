const User = require('../models/user')
const { graphError } = require('../utils/graph-errors')
const jwt = require('jsonwebtoken')

const addUser = async (root, args) => {
  const user = new User({...args})

  try {
    await user.save()
  } catch (error) { 
    graphError('Saving user fails', args.username, error)
  }

  return user
}

const login = async (root, args) => {
  const user = await User.findOne({username: args.username})

  if (!user || args.password != 'secret')
    graphError('wrong credentials', null, null)

  const userForToken = {
    username: user.username,
    id: user._id
  }

  return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
}

module.exports = { addUser, login }