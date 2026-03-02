const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
        if (args.author && args.genre) {
            const author = await Author.findOne({ name: args.author })
            return Book.find({ author: author._id, genres: { $in: [args.genre] } }).populate('author')
        }
        if (args.author) {
            const author = await Author.findOne({ name: args.author })
            return Book.find({ author: author._id }).populate('author')
        }
        if (args.genre) {
            return Book.find({ genres: { $in: [args.genre] } }).populate('author')
        }
        return Book.find({}).populate('author')
    },
    allAuthors: async (root, args) => {
        return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
        return await Book.countDocuments({ author: root._id })
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
        const currentUser = context.currentUser

        if (!currentUser) {
            throw new GraphQLError('Not authenticated', {
                extensions: {
                    code: 'UNAUTHENTICATED'
                }
            })
        }
        const authorExists = await Author.exists({ name: args.author })

        if (!authorExists) {
            const author = new Author({ name: args.author })
            try {
                await author.save()
            } catch (error) {
                throw new GraphQLError('Saving author failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.author,
                        error
                    }
                })
            }
        }

        const author = await Author.findOne({ name: args.author })
        const book = new Book({ ...args, author: author })

        try {
            await book.save()
        } catch (error) {
            throw new GraphQLError('Saving book failed', {
                extensions: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.title,
                    error
                }
            })
        }
        return book
    },
    editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser

        if (!currentUser) {
            throw new GraphQLError('Not authenticated', {
                extensions: {
                    code: 'UNAUTHENTICATED'
                }
            })
        }

      const author = await Author.findOne({ name: args.name })
      if (!author) return null

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Updating author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.setBornTo,
            error
          }
        })
      }
      return author
    },
    createUser: async (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

        return user.save()
            .catch(error => {
                throw new GraphQLError(`Creating the user failed: ${error.message}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.username,
                        error
                    }
                })
            })
    },
    login: async (root, args) => {
        const user = await User.findOne({ username: args.username })

        if (!user || args.password !== 'secret') {
            throw new GraphQLError('wrong credentials', {
                extensions: {
                    code: 'BAD_USER_INPUT'
                }
            })
        }

        const userForToken = {
            username: user.username,
            id: user._id,
        }
        return {
            value: jwt.sign(userForToken, process.env.JWT_SECRET)
        }
    }
  }
}

module.exports = resolvers