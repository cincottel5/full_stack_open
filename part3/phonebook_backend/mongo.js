const mongoose = require('mongoose')

const instructions = 
`
  Usage examples: 
  1. Saving a new phone number:
  > mongo mongo.js <Password> <"Person name"> <"Person phone number">
  * All parameters are required


  2. Showing phone numbers stored in the database
  > mongo mongo.js <Password>
  * Password parameter is required
`

if (process.argv.length < 3 || process.argv.length === 4) {
  console.log(instructions)
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.rrian.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({})
    .then( result => {
      console.log("Phonebook:")
      result.map(x => console.log(`${x.name} ${x.number}`))
      mongoose.connection.close()
    })
}

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save()
    .then(result => {
      console.log(`added ${person.name} ${person.number} to phonebook`)
      mongoose.connection.close()
    })
}






