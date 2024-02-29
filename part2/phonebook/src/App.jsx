import { useState } from 'react'

function App() {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPersonObject = { name: newName }
    setPersons(persons.concat(newPersonObject))
    setNewName('')
  }

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}> 
        <div>
          name: <input onChange={handleNewNameChange}/>
        </div>
        <div>
          <button type="submit" value={newName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <div key={person.name}>{person.name}</div>  
      )}
    </div>
  )
}

export default App
