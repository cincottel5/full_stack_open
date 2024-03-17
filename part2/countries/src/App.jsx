import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import countriesService from './services/countries'

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const hook = () => {
    const eventHandler = initialCountries =>
      setCountries(initialCountries)
    
    countriesService.getAll()     
      .then(eventHandler)
  }

  useEffect(hook, [])
  const countriesFilter = () => {
    if(selected === null) {
      return search !== '' 
      ? countries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()))
      : []
    } else {
      return countries.filter(c=> c.ccn3 === selected)
    }
  }

  const countriesToShow = countriesFilter()

  const handleSearchChange = search => {
    setSelected(null)
    setSearch(search)
  }
  
  return (
    <div>
      <Filter search={search} handleSearchChange={handleSearchChange}/>
      <Countries countries={countriesToShow} setSelected={setSelected}/>
    </div>
  )
}

export default App
