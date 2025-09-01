const { ApolloServer } = require('@apollo/server')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const { makeExecutableSchema } = require('@graphql-tools/schema')
const userResolvers = require('./resolvers/user')
const express = require('express')
const { expressMiddleware } = require('@as-integrations/express5')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const cors = require('cors')
const http = require('http')
const { useServer } = require('graphql-ws/use/ws')
const { PubSub } = require('graphql-subscriptions')
const { WebSocketServer } = require('ws')
const jwt = require('jsonwebtoken')

const pubsub = new PubSub()

const User = require('./models/user')
const Book = require('./models/book')
const bookResolvers = require('./resolvers/book')
const Author = require('./models/author')
const authorResolvers = require('./resolvers/author')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to mongodb')
mongoose.connect(MONGODB_URI)
  .then(() => console.log('connected to mongodb'))
  .catch(error => console.log(`error connection to mongodb: ${error}`))

mongoose.set('debug', true)

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

  type Subscription {
    bookAdded: Book!
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
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
    }
  }
}

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/'
  })

  const schema =  makeExecutableSchema({ typeDefs, resolvers})
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema, 
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            }
          }
        }
      }
    ]
  })

  await server.start()

  app.use(
    '/', 
    cors(), 
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null


        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
          const currentUser = await User.findById(decodedToken.id)

          return { currentUser, pubsub }
        }
      }
    })
  )

  const PORT = 4000
  httpServer.listen(PORT, () => console.log(`Server is now listening on  http://localhost:${PORT}`))
}

start()