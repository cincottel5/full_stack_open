const blogsRoutes = require('express').Router()
const Blog = require('../models/blog')

blogsRoutes.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRoutes.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
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

blogsRoutes.delete('/:id', async(request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRoutes