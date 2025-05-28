const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const bookResolvers = require('./resolvers/book')
const Author = require('./models/author')
const authorResolvers = require('./resolvers/author')
const { apolloContext } = require('./utils/apollo-context')
const userResolvers = require('./resolvers/user')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to mongodb')
mongoose.connect(MONGODB_URI)
  .then(() => console.log('connected to mongodb'))
  .catch(error => console.log(`error connection to mongodb: ${error}`))


const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: bookResolvers.getAllBooks,
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    addBook: bookResolvers.addBook,
    editAuthor: authorResolvers.editAuthor,
    createUser: userResolvers.addUser,
    login: userResolvers.login
  },
  Author: {
    bookCount: authorResolvers.getBookCount
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: apolloContext
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})