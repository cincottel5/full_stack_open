import { useState } from "react"

const PersonForm = ({persons, setPersons}) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const addPerson = (event) => {
        event.preventDefault()

        if (persons.find(x => x.name === newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }

        const newPersonObject = { name: newName, number: newNumber }
        setPersons(persons.concat(newPersonObject))
        setNewName('')
        setNewNumber('')
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