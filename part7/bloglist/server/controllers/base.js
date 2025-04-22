const mongoose = require('mongoose')
const baseRoutes = require('express').Router()

baseRoutes.get('/', (request, response) => {
  response.send('Welcome to the blogs api')
})

baseRoutes.get('/info', (request, response) => {
  response.json({
    date: new Date(),
    db_state: mongoose.connection.readyState,
  })
})

module.exports = baseRoutes
