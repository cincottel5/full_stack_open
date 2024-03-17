const Filter = ({search, handleSearchChange})=> {

  const onSearchChange = event => {
    handleSearchChange(event.target.value)
  }

  return (
    <div>
      find countries <input value={search} onChange={onSearchChange}/>
    </div>
  )
}

export default Filter