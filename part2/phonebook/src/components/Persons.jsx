const PersonDetail = ({person}) => {
    return (
        <div>{person.name} {person.number}</div>  
    )
}

const Persons = ({persons}) => {
    return (
        <div>
            { persons.map(person => 
                <PersonDetail key={person.name} person={person}></PersonDetail>
            )}
        </div>
    )
}

export default Persons