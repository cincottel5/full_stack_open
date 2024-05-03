const morgan = require('morgan')
const logger = require('./logger')

morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})

const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') 
    return response.status(400).send({error: 'malformatted id'})
  
  if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }

  if (error.name === 'SyntaxError') {
    return response.status(400).end()
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}