import { useSelector } from "react-redux"

const Notification = () => {
  const message = useSelector(state => state.notification)
  if (!message) return null

  const style = {
    marginTop: '10px',
    marginBottom: '10px',
    color: 'red'
  }

  return (
    <div style={style}>{message}</div>
  )
}

export default Notification