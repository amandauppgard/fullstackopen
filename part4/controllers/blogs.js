const blogsRouter = require('express').Router()
const { request } = require('http')
const Blog = require('../models/blog')
const { response } = require('../app')


blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  if (blog.title === undefined || blog.url == undefined) {
    return response.status(400).json({error: 'missing title or url'})
  }

  if (blog.likes === undefined) blog.likes = 0

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body

    const post = await Blog.findById(request.params.id)
    if (!post) {
      return response.status(404).end()
    }

    post.title = title ?? post.title
    post.author = author ?? post.author
    post.url = url ?? post.url
    post.likes = likes ?? post.likes

    const updatedPost = await post.save()
    response.json(updatedPost)
  } catch (error) {
    next(error)
  }
});


module.exports = blogsRouter