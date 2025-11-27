const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const assert = require('node:assert')
const User = require('../models/user')


let token = null

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogPosts)

  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('password', 10)
  const user = new User({ username: 'testUser', passwordHash })
  await user.save()

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'testUser', password: 'password' })

  token = loginResponse.body.token
})

test('correct amount of blog posts are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('correct amount of blog posts are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length === 2, true)
})

test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    assert.ok(blog.id)
})

test('blog post cannot be added without token', async () => {
    const newPost = {
        title: "new blog post",
        author: "author",
        url: "frogsarecool.com",
        likes: 89
    }

    await api
        .post('/api/blogs')
        .send(newPost)
        .expect(400)
        .expect('Content-Type', /application\/json/)
})

test('blog post can be added', async () => {
    const newPost = {
        title: "new blog post",
        author: "author",
        url: "frogsarecool.com",
        likes: 89
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    const savedPost = response.body[response.body.length - 1]
    assert.strictEqual(response.body.length > helper.initialBlogPosts.length, true)
    assert.deepStrictEqual(
        {
            title: savedPost.title,
            author: savedPost.author,
            url: savedPost.url,
            likes: savedPost.likes
        }, 
        newPost)
})

test('likes default to 0 if missing', async () => {
    const missingLikes = {
        title: "new blog post",
        author: "author",
        url: "frogsarecool.com",
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(missingLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    const savedPost = response.body[response.body.length - 1]
    assert.strictEqual(savedPost.likes === 0, true)
})

test('missing title or url returns code 400 bad request', async () => {
    const missingProperties = {
        author: "author",
        likes: 3
    }

    await api
        .post('/api/blogs')
        .send(missingProperties)
        .expect(400)
})

test('blog post can be deleted by user who created it', async () => {
    const newPost = {
        title: "new blog post",
        author: "author",
        url: "frogsarecool.com",
        likes: 89
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const postToDelete = response.body[response.body.length - 1]

    await api 
        .delete(`/api/blogs/${postToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

    const updatedResponse = await api.get('/api/blogs')
    assert.strictEqual(updatedResponse.body[0] !== postToDelete, true)
})

test('blog post can be updated', async () => {
    const response = await api.get('/api/blogs')
    const postToUpdate = response.body[0]

    const updatedPost = {
        author: "new",
        title: 'new title',
        url: 'www.a.com',
        likes: 3
    }

    await api
        .put(`/api/blogs/${postToUpdate.id}`)
        .send(updatedPost)
        .expect(200)

    const updatedPosts = await api.get('/api/blogs')
    assert.deepStrictEqual({
        author: updatedPosts.body[0].author,
        title: updatedPosts.body[0].title,
        url: updatedPosts.body[0].url,
        likes: updatedPosts.body[0].likes
    },
    updatedPost
    )
})

test('new user can be created', async () => {
    const initialUsers = await api.get('/api/users')
    const newUser = {
        username: "username",
        name: "name",
        password: "password"
    }

    await api 
        .post('/api/users')
        .send(newUser)
        .expect(201)

    const updatedUsers = await api.get('/api/users')
    assert.strictEqual(updatedUsers.body.length > initialUsers.body.length, true)
})

test('missing password returns code 400 bad request', async () => {
    const noPassword = {
        username: "username",
        name: "name"
    }

    await api 
        .post('/api/users')
        .send(noPassword)
        .expect(400)
})

test('too short password returns code 400 bad request', async () => {
    const invalidPassword = {
        username: "username",
        name: "name",
        password: "p"
    }

    await api 
        .post('/api/users')
        .send(invalidPassword)
        .expect(400)
})

test('too short username returns code 400 bad request', async () => {
    const invalidUsername = {
        username: "u",
        name: "name",
        password: "password"
    }

    await api 
        .post('/api/users')
        .send(invalidUsername)
        .expect(400)
})

test('missing username returns code 400 bad request', async () => {
    const invalidPassword = {
        name: "name",
        password: "p"
    }

    await api 
        .post('/api/users')
        .send(invalidPassword)
        .expect(400)
})

after(async () => {
  await mongoose.connection.close()
})