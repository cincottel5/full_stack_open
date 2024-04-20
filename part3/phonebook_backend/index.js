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
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static("dist"))

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

app.post('/api/persons', (request, response) => {
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
    .catch( error => {
      response.status(500).json({error: error})
    })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})


const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

