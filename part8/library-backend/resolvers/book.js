const Book = require('../models/book')
const Author = require('../models/author')
const { graphError } = require('../utils/graph-errors')

const getAllBooks = async (root, args) => {
  if (!args.author && !args.genre) 
    return Book.find({}).populate('author')

  let query = {}

  if (args.author) {
    const author = await Author.findOne({name: args.author})
    query = { ...query, author: author._id }
  } 
  if (args.genre) query = { ...query, genres: args.genre }

  return Book.find(query).populate('author')
}

const addBook = async (root, args, context) => {
  const currentUser = context.currentUser
  if (!currentUser) graphError('not authenticated')

  const book = new Book({...args})
  const author =  await Author.findOne({name: args.author})

  if (!author) graphError('Saving book fails', args.title, null)

  book.author = author

  try {
    await book.save()
  } catch (error) { 
    graphError('Saving book fails', args.title, error)
  }

  return book
}

module.exports = {
  getAllBooks,
  addBook
}