const morgan = require('morgan')
const logger = require('./logger')
const jwtToken = require('./jwt_token')

morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})

const requestLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms :body',
)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError')
    return response.status(400).send({ error: 'malformatted id' })

  if (error.name === 'ValidationError')
    return response.status(400).json({ error: error.message })

  if (error.name === 'SyntaxError') return response.status(400).end()

  if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  )
    return response
      .status(400)
      .json({ error: 'expected `username` to be unique' })

  if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError')
    return response.status(401).json({ error: 'token invalid' })

  if (error.name === 'Unauthorized')
    return response.status(401).json({ error: 'Unauthorized' })

  if (error.name === 'NotFound')
    return response.status(404).json({ error: 'Not found' })

  next(error)
}

const tokenExtractor = (request, response, next) => {
  request.token = jwtToken.getTokenFrom(request)
  next()
}

const userExtractor = (request, response, next) => {
  request.user = jwtToken.verify(request.token).id
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
