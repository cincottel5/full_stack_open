import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null) return null

  let className = `notification notification-${notification.isSuccess ? 'success' : 'error'}`

  return <div className={className}>{notification.message}</div>
}


export default Notification
