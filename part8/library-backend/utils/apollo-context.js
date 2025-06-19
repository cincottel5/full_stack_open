const jwt = require('jsonwebtoken')
const User = require('../models/user')

const apolloContext = async ({req, res}) => {
  const auth = req ? req.headers.authorization: null
  
  if (!auth || !auth.startsWith('Bearer ')) return 

  const decodedToken = jwt.verify(
    auth.substring(7), 
    process.env.JWT_SECRET)

  const currentUser = await User.findById(decodedToken.id)

  return { currentUser } 
}

module.exports = { apolloContext }