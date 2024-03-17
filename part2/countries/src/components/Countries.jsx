import { useState, useEffect } from 'react'
import CountryDetail from './CountryDetail'

const Countries = ({countries, setSelected}) => {

  const handleShowClick = (countryId) => {
    setSelected(countryId)
  }

  const render = () => {
    if (countries.length === 0)
      return "Input something to show some results"
    if (countries.length > 10) 
      return "Too many matches, specify another filter"

    if (countries.length === 1) 
      return <CountryDetail country={countries[0]}/>

    return (
      <div>
        { countries.map( c=> 
          <div key={c.ccn3}>{c.name.common} <button onClick={()=> handleShowClick(c.ccn3)}>show</button></div>  
        )}
      </div>
    )
  }

  return (
    <div>
      { render() }
    </div>
  )
}

export default Countries