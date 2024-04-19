import { useState } from "react"
import personService from '../services/persons'

const PersonForm = ({persons, setPersons, showNotification}) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const addPerson = (event) => {
        event.preventDefault()

        const existentPerson = persons.find(x => x.name === newName)
        const newPersonObject = { name: newName, number: newNumber }

        if (existentPerson) {
            updatePerson(existentPerson, newPersonObject)
            return
        }

        const eventHandler = returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            showNotification(`Added ${returnedPerson.name}`)
        }

        personService.create(newPersonObject)
            .then(eventHandler)
    }

    const updatePerson = (existentPerson, newPersonObject) => {
        if (!window.confirm(`${existentPerson.name} is already added to phonebook, replace the old number with a new one?`))
          return

        const eventHandler = (updatedPerson) => {
          setPersons(persons.map(p=> p.id !== updatedPerson.id ? p : updatedPerson))
          showNotification(`Updated ${updatedPerson.name}`)
        }

        personService.update(existentPerson.id, newPersonObject)
          .then(eventHandler)
          .catch( error => {
            showNotification(`Information of ${existentPerson.name} has already been removed from Server`, false)
          })
    }

    const handleNewNameChange = (event) => {
        setNewName(event.target.value)
      }
    
      const handleNewNumberChange = (event) => {
        setNewNumber(event.target.value)
      }

    return (
        <form onSubmit={addPerson}> 
            <h2>add a new </h2>
            <div>
            name: <input value={newName} onChange={handleNewNameChange}/>
            </div>
            <div>
            number: <input value={newNumber} onChange={handleNewNumberChange}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm