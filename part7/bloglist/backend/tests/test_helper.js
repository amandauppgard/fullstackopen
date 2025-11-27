const Blog = require('../models/blog')
const User = require('../models/user')

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

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON({}))
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogPosts,
    blogsInDb,
    usersInDb
}