import { useNotificationValue, useNotificationDispatch } from '../context/NotificationContext'


const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notification = useNotificationValue()
  const dispatch = useNotificationDispatch()
  
  if (notification === '') return null

  setTimeout(() => {
    dispatch({type: 'CLEAR'})
  }, 5000)

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
