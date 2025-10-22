const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const assert = require('node:assert')

const api = supertest(app)

const initialBlogPosts = [
    {
        title: "blog post 2",
        author: "mongo",
        url: "http://mongodb.com",
        likes: 50
    }, 
    {
        title: "blog post",
        author: "amanda",
        url: "http://address.com",
        likes: 3
    }
]

beforeEach(async () => {  
    await Blog.deleteMany({})  
    let blogObject = new Blog(initialBlogPosts[0])  
    await blogObject.save()  
    blogObject = new Blog(initialBlogPosts[1])  
    await blogObject.save()
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

test('blog post can be added', async () => {
    const newPost = {
        title: "new blog post",
        author: "author",
        url: "frogsarecool.com",
        likes: 89
    }

    await api
        .post('/api/blogs')
        .send(newPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    const savedPost = response.body[response.body.length - 1]
    assert.strictEqual(response.body.length > initialBlogPosts.length, true)
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

after(async () => {
  await mongoose.connection.close()
})