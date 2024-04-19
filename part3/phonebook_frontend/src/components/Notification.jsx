const Notification = ({message, isSuccessMessage}) => {
  if (message === null) return null

  let className = `notification ${isSuccessMessage ? 'notification-success': 'notification-error'}`

  return (
    <div className={className}>{message}</div>
  )
}

export default Notification