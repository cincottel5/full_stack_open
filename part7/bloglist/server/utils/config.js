require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

const SECRET = process.env.SECRET

const TOKEN_EXP = 3600

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
  TOKEN_EXP,
}
