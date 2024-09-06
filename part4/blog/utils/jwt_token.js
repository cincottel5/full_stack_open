const jwt = require('jsonwebtoken')
const config = require('./config')

const newToken = user => {
  const userForToken = {username: user.username, id: user._id}
  const jwtOptions = { expiresIn: parseInt(config.TOKEN_EXP)}

  return jwt.sign(userForToken, config.SECRET, jwtOptions)
}

const getTokenFrom = request => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer'))
    return authorization.replace('Bearer ', '')

  return null
}

const verify = token => {
  return jwt.verify(token, config.SECRET)
}

const decodeToken = request => {
  return verify(getTokenFrom(request))
}

module.exports = {
  newToken,
  getTokenFrom,
  decodeToken,
  verify
}