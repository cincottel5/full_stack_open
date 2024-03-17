import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageIsSuccess, setMessageIsSuccess] = useState(true)

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

  const showNotification = (message, isSuccess = true) => {
    setMessage(message)
    setMessageIsSuccess(isSuccess)
    setTimeout(() => {
      setMessage(null)
    }, 5000);
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isSuccessMessage={messageIsSuccess}/>
      <Filter 
        filter={filter} 
        setFilter={setFilter}></Filter>
      <PersonForm 
        persons={persons} 
        setPersons={setPersons} 
        showNotification={showNotification}></PersonForm>
      <h2>Numbers</h2>
      <Persons 
        persons={numbersToShow} 
        setPersons={setPersons}></Persons>
    </div>
  )
}

export default App
