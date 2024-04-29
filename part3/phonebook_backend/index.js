require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('body', (request, response) => {
  return JSON.stringify(request.body)
})

app.use(cors())
app.use(express.static("dist"))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/', (request, response) => {
  response.send({message: 'server running', time: new Date()})
})

app.get('/info', (request, response) => {

  Person.countDocuments({})
    .then(count => {
      const info = `
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
      `
      response.send(info)
    })
    .catch( error => {
      response.status(500).send(`Error: ${error.message}`)
    })
  
})

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch( error => {
      response.status(500).send(`Error: ${error.message}`)
    })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    .catch ( error => {
      response.status(500).send(`Error: ${error.message}`)
    })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) 
    return response.status(400).json({error: 'name or number is missing'})

  const name = body.name

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch( error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, {new: true, runValidators: true, context: 'query'})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
  console.log(error)

  if (error.name === 'CastError')
    return response.status(400).send({error: 'malformatted id'})

  if (error.name === "ValidationError") 
    return response.status(400).send({error: error.message})

  next()
}

app.use(errorHandler)


const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

