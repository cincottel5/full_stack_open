const blogsRoutes = require('express').Router()
const Blog = require('../models/blog')

blogsRoutes.get('/', (request, response) => {
  Blog.find({}).then(blogs => response.json(blogs))
})

blogsRoutes.post('/', (request, response, next) => {
  const blog = new Blog(request.body)
  blog.save()
    .then(result => response.status(201).json(result))
    .catch(error => next(error))
})

module.exports = blogsRoutes