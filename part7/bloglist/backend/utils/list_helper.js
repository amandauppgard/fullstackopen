const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    let total = 0
    blogs.forEach(blog => total = total + blog.likes)
    return total
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null
    const mostLikes = Math.max(...blogs.map(blog => blog.likes))
    const favorite = blogs.find(blog => blog.likes === mostLikes)
    return favorite  
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null

    const grouped = _.groupBy(blogs, 'author')
    const authors = _.map(grouped, (authorBlogs, author) => ({
        author,
        blogs: authorBlogs.length
    }))

    return _.maxBy(authors, 'blogs')
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null

    const grouped = _.groupBy(blogs, 'author')
    const authors = _.map(grouped, (authorBlogs, author) => ({
        author,
        likes: _.sumBy(authorBlogs, 'likes')
    }))

    return _.maxBy(authors, 'likes')
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }