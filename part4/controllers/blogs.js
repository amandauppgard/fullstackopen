const blogsRouter = require('express').Router()
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

  response.status(201).json(savedBlog)
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
    response.json(updatedPost)
  } catch (error) {
    next(error)
  }
});


module.exports = blogsRouter