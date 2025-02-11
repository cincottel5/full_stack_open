const { test, describe, after, beforeEach} = require("node:test")
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')
const _ = require("lodash")

const api = supertest(app)

describe('accessing the application', () => {
  
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })

  test('using valid credentials', async () => {
    const {username, password} = helper.initialUsers[0]

    await api
      .post('/api/login')
      .send({username, password})
      .expect(200)
  })
})

after(async () => {
  await mongoose.connection.close()
})