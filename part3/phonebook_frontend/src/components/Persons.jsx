import personService from '../services/persons'

const PersonDetail = ({ person, handleRemove }) => {
	return (
		<div>
			{person.name} {person.number} <button type="button" onClick={() => handleRemove(person.id)}>delete</button></div>
	)
}

const Persons = ({ persons, setPersons }) => {

	const removePerson = (id) => {
		const person = persons.find(p => p.id === id)

		const eventHandler = (personDeleted) =>
			setPersons(persons.filter(p => p.id !== id))

		if (window.confirm(`Delete ${person.name}?`)) {
			personService.remove(id)
				.then(eventHandler)
		}
	}

	return (
		<div>
			{persons.map(person =>
				<PersonDetail key={person.id} person={person} handleRemove={removePerson}></PersonDetail>
			)}
		</div>
	)
}

export default Persons