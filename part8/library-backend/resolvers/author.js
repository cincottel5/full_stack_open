const Author = require('../models/author')
const Book = require('../models/book')
const { graphError } = require('../utils/graph-errors')

const editAuthor = async (root, args, context) => {
  const currentUser = context.currentUser
  if (!currentUser) graphError('not authenticated')

  const author = await Author.findOne({name: args.name})
  if (!author) graphError('Edit author fails', args.name)
  
  author.born = args.setBornTo

  try {
    await author.save()
  } catch (error) {
    graphError('Edit author fails', args.name, error)
  }

  return author
}

const getBookCount = async root => 
  root.books.length
  //Book.collection.countDocuments({author: root._id})

module.exports = { editAuthor, getBookCount }