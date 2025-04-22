const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const _ = require('lodash')
const { newToken } = require('../utils/jwt_token')

const api = supertest(app)

let token

describe('when there are initially some blogs saved', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = await new User(helper.initialUsers[0]).save()
    token = newToken(user)

    await Blog.deleteMany({})

    const blogs = helper.initialBlogs
    blogs.map((x) => (x.user = user._id))

    await Blog.insertMany(blogs)
  })

  describe('querying existent blogs ', () => {
    test('all blogs are returned', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('all blog`s key name is id', async () => {
      const response = await api.get('/api/blogs')
      response.body.map((blog) => assert('id' in blog))
    })
  })

  describe('addition of a new blog', () => {
    test('succeeds when data is valid', async () => {
      const newBlog = {
        title: 'Cómo mejorar la gestión de impedimentos en Scrum',
        author: 'Juan Pérez',
        url: 'https://www.ejemplo.com/articulo-gestion-impedimentos-scrum',
        likes: 10,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInBd()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const blogsContent = blogsAtEnd.map(({ id, user, ...blog }) => blog)

      assert(blogsContent.some((b) => _.isEqual(b, newBlog)))
    })

    test('succeds even without likes field and it sets likes to 0', async () => {
      const newBlog = {
        title: 'Cómo mejorar la gestión de impedimentos en Scrum',
        author: 'Juan Pérez',
        url: 'https://www.ejemplo.com/articulo-gestion-impedimentos-scrum',
      }

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.likes, 0)
    })

    test('fails with status 400 if title field is not present', async () => {
      const newBlog = {
        author: 'Juan Pérez',
        url: 'https://www.ejemplo.com/articulo-gestion-impedimentos-scrum',
        likes: 10,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
    })

    test('fails with status 400 if url field is not present', async () => {
      const newBlog = {
        title: 'Cómo mejorar la gestión de impedimentos en Scrum',
        author: 'Juan Pérez',
        likes: 10,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
    })

    test('fails with status 400 if url and title fields are not present', async () => {
      const newBlog = {
        author: 'Juan Pérez',
        likes: 10,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds when id exists', async () => {
      const blogsAtStart = await helper.blogsInBd()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInBd()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const blogsContent = blogsAtEnd.map(({ id, ...blog }) => blog)
      assert(!blogsContent.some((b) => _.isEqual(b, blogToDelete)))
    })

    test(
      'fails with status code 400 when id does not exists',
      { todo: true },
      async () => {
        const validNonExistingId = await helper.nonExistingId()

        await api
          .delete(`/api/blogs/${validNonExistingId}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(400)

        const blogsAtEnd = await helper.blogsInBd()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
      },
    )

    test(
      'fails with status 400 when id has not the correct format',
      { todo: true },
      async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
          .delete(`/api/blogs/${invalidId}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(400)

        const blogsAtEnd = await helper.blogsInBd()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
      },
    )
  })

  describe('update of a blog', () => {
    test('succeeds when id exists', async () => {
      const blogsAtStart = await helper.blogsInBd()
      const blogToUpdate = blogsAtStart[0]
      blogToUpdate.likes = 555

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

      const blogsAtEnd = await helper.blogsInBd()
      const updatedBlogAtEnd = await blogsAtEnd.find(
        (b) => b.id === blogToUpdate.id,
      )

      assert.strictEqual(updatedBlogAtEnd.likes, blogToUpdate.likes)
    })

    test('fails when id does not exists', async () => {
      const validNonExistingId = await helper.nonExistingId()
      const { _id, __v, ...blog } = helper.initialBlogs[0]
      blog.likes = 555

      await api.put(`/api/blogs/${validNonExistingId}`).send(blog).expect(404)

      const blogsAtEnd = await helper.blogsInBd()
      const blogsLikes = blogsAtEnd.map((b) => b.likes)
      assert(!blogsLikes.includes(555))
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
