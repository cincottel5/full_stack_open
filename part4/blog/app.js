const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogRoutes = require('./controllers/blogs')
const baseRoutes = require('./controllers/base')
const userRoutes = require('./controllers/users')
const loginRoutes = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('connected to MongoDB'))
  .catch(error => logger.error('error connecting to MongoDB: ', error.message))

app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV !== 'test')
  app.use(middleware.requestLogger)

app.use(middleware.tokenExtractor)

app.use('/', baseRoutes)
app.use('/api/login', loginRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/users', userRoutes)



app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
