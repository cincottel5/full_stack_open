import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

const Toggable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(refs, () => ({ toggleVisibility }))

  return (
    <div className='mb-4 '>
      <div style={hideWhenVisible}>
        <Button variant='outline-primary' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>

      <div style={showWhenVisible}>
        {props.children} 
        <Button variant='outline-secondary' className='mt-4' onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  )
})

Toggable.displayName = 'Toggable'
Toggable.propTypes = {
  children: PropTypes.any,
  buttonLabel: PropTypes.string.isRequired,
}

export default Toggable
