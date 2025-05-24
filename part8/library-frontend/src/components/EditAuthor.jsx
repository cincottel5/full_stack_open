import { useState, useRef } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'
import { EDIT_AUTHOR_BIRTHDATE, ALL_AUTHORS } from '../utils/queries'

const EditAuthor = ({authors}) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  const [changeBirthdate, result] = useMutation(EDIT_AUTHOR_BIRTHDATE, {
    refetchQueries: [ {query: ALL_AUTHORS}],
    onError: error => {
      console.log(error)
    }
  })

  const selectOptions = authors.map(a => ({ value: a.name, label: a.name}))

  const onSubmit = event => {
    event.preventDefault()

    if (name === '' || born === '') return 
    changeBirthdate({ variables: { name: name.value, setBornTo: parseInt(born) }})

    setName(null)
    setBorn('')
  }

  return (
    <>
      <h2>Set birthyear</h2>

      <form onSubmit={onSubmit}>
        <Select
          options={selectOptions}
          onChange={setName}
          value={name}
        />

        <div>
          born <input type="text" value={born} onChange={({target}) => setBorn(target.value)} />
        </div>

        <button type="submit">update author</button>
      </form>
    </>
  )
}

export default EditAuthor