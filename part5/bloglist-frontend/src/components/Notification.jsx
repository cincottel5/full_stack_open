import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'

//const Notification = ({ message, setMessage, isSuccess=true }) => {
const Notification = forwardRef((props, refs) => {
  const [message, setMessage] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const displayMessage = (newMessage, isSuccess) => {
    setMessage(newMessage)
    setIsSuccess(isSuccess)
    setTimeout(() => setMessage(null), 5000)
  }

  useImperativeHandle(refs, () => ({ displayMessage }))

  let className = `notification notification-${isSuccess ? 'success': 'error'}`

  return (
    <>
      { message !== null
        ? <div className={className}>{ message }</div>
        : null
      }
    </>
  )
})

Notification.displayName = 'Notification'

export default Notification