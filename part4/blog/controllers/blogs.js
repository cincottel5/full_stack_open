const blogsRoutes = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { throwError } = require('../utils/throw_helper')
const middleware = require('../utils/middleware')

blogsRoutes.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {blogs:0})
  response.json(blogs)
})

blogsRoutes.post('/', middleware.userExtractor, async (request, response) => {
  const blog = new Blog(request.body)

  if(!request.user) throwError('JsonWebTokenError')

  const user = await User.findById(request.user)
  blog.user = user
  
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  response.status(201).json(savedBlog)
})

blogsRoutes.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updateParams = { new: true, runValidators: true, context: 'query'}
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, updateParams )
  
  if (updatedBlog) response.json(updatedBlog)
  else response.status(404).end()
})

blogsRoutes.delete('/:id', middleware.userExtractor, async(request, response) => {
  if (!request.user) throwError('JsonWebTokenError')

  const blog = await Blog.findById(request.params.id)

  if(!blog) throwError('ValidationError')

  if(!blog.user || request.user !== blog.user.toString())
    throwError('Unauthorized')
  
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRoutes