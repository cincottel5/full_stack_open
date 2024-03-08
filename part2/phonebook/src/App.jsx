import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')

  const numbersToShow = filter === ''
    ? persons
    : persons.filter(x=> x.name.includes(filter))

  const hook = () => {
    const eventHandler = initialPersons => {
      setPersons(initialPersons)
    }

    personsService.getAll()
      .then(eventHandler)
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}></Filter>
      <PersonForm persons={persons} setPersons={setPersons}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={numbersToShow} setPersons={setPersons}></Persons>
    </div>
  )
}

export default App
