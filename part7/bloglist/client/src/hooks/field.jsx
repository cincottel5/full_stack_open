import { useState } from "react"

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clear = () => {
    setValue('')
  }

  const asInput = () => ({ type, value, onChange })

  return {
    value, 
    setValue,
    onChange,
    clear,
    asInput
  }
}

export default useField
