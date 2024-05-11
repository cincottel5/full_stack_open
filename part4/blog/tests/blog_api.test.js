const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const _ = require('lodash')

const api = supertest(app)

beforeEach( async () => {
  await Blog.deleteMany({})

  const blogObjs = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjs.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('blog api', () => {
  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('all blog`s key name is id', async () => {
    const response = await api.get('/api/blogs')  
    response.body.map(blog => assert('id' in blog))
  })

  test('a blog can be added', async () => {
    const newBlog = {
      title: "Cómo mejorar la gestión de impedimentos en Scrum",
      author: "Juan Pérez",
      url: "https://www.ejemplo.com/articulo-gestion-impedimentos-scrum",
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInBd()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const blogsContent = blogsAtEnd.map(({ id, ...blog}) => blog)
    assert(blogsContent.some(b => _.isEqual(b, newBlog)))
  })

  test('a blog without likes is added with likes 0', async () => {
    const newBlog = {
      title: "Cómo mejorar la gestión de impedimentos en Scrum",
      author: "Juan Pérez",
      url: "https://www.ejemplo.com/articulo-gestion-impedimentos-scrum",
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      author: "Juan Pérez",
      url: "https://www.ejemplo.com/articulo-gestion-impedimentos-scrum",
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('blog without url is not added', async () => {
    const newBlog = {
      title: "Cómo mejorar la gestión de impedimentos en Scrum",
      author: "Juan Pérez",
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('blog without url and title is not added', async () => {
    const newBlog = {
      author: "Juan Pérez",
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})
