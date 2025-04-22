import { configureStore } from '@reduxjs/toolkit'
import notification from './notificationReducer'
import user from './userReducer'
import blogs from './blogReducer'

const reducer = { notification, user, blogs }
const setStore = preloadedState => configureStore({ reducer, preloadedState })

export default setStore