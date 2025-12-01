const blogsRouter = require('express').Router()
const { request } = require('http')
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1})

  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const blog = new Blog(request.body)
  const user = request.user

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  if (blog.title === undefined || blog.url == undefined) {
    return response.status(400).json({error: 'missing title or url'})
  }

  if (blog.likes === undefined) blog.likes = 0

  blog.user = user._id

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const populatedBlog = await Blog.findById(savedBlog._id)
    .populate('user', { username: 1, name: 1 })

  response.status(201).json(populatedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (user._id.toString() !== blog.user.toString()) {
    return response.status(403).json({ error: 'permission denied' })
  }

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
    const populatedPost = await Blog.findById(updatedPost._id)
      .populate('user', { username: 1, name: 1 })

    response.json(populatedPost)
  } catch (error) {
    next(error)
  }
});

blogsRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const { comment } = request.body

    if (!comment) {
      return response.status(400).json({ error: 'missing comment' })
    }

    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(404).end()
    }

    blog.comments.push(comment)

    const savedBlog = await blog.save()

    const populatedBlog = await Blog.findById(savedBlog._id)
      .populate('user', { username: 1, name: 1 })

    response.status(201).json(populatedBlog)
  } catch (error) {
    next(error)
  }
})



module.exports = blogsRouter