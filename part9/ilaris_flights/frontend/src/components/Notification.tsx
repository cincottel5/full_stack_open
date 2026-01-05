import { useState, forwardRef, useImperativeHandle } from 'react'

export type NotificationHandle = {
  show: (text: string) => void
}

const style = { color: 'red', marginBottom: '1rem', marginTop: '1rem' }

const Notification = forwardRef<NotificationHandle>((_props, refs) => {
  const [message, setMessage] = useState<string|null>(null)

  const show = (text: string) => {
    setMessage(text)
    setTimeout(() => setMessage(null), 5000)
  }

  useImperativeHandle(refs, () => ({ show }))

  if (message) return <div className="notification" style={style}>{message}</div>
})

Notification.displayName = "Notification"

export default Notification