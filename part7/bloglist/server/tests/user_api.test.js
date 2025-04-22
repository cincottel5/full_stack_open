const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('addition of  a new user', () => {
  test('succeeds when data is valid', async () => {
    const newUser = {
      username: 'user_test',
      name: 'User test',
      password: 'test',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInBd()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)

    const usernames = usersAtEnd.map((x) => x.username)
    assert(usernames.some((x) => x === newUser.username))
  })

  test('fails when username is too short', async () => {
    const newUser = {
      username: 'us',
      name: 'User test',
      password: 'test',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInBd()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)

    const usernames = usersAtEnd.map((x) => x.username)
    assert(!usernames.some((x) => x === newUser.username))
  })

  test('fails when password is too short', async () => {
    const newUser = {
      username: 'user_test',
      name: 'User test',
      password: 'te',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInBd()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)

    const usernames = usersAtEnd.map((x) => x.username)
    assert(!usernames.some((x) => x === newUser.username))
  })

  test('fails when data is not complete', async () => {
    const newUser = {
      name: 'User test',
      password: 'te',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInBd()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)

    const usernames = usersAtEnd.map((x) => x.username)
    assert(!usernames.some((x) => x === newUser.username))
  })

  test('fails when username already exists', async () => {
    await api
      .post('/api/users')
      .send(helper.initialUsers[0])
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInBd()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
  })
})

after(async () => {
  mongoose.connection.close()
})
