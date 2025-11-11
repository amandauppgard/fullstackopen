import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const Notification = ({ message }) => {
  if (message === null){
    return null
  }

  return (
    <div className='message'>
      {message}
    </div>
  )

}

const ErrorNotification = ({ message }) => {
  if (message === null){
    return null
  }

  return (
    <div className='errorMessage'>
      {message}
    </div>
  )

}

const App = () => {
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.toSorted((a,b) => b.likes - a.likes))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogIn = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`user ${user.username} was succesfully logged in`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setMessage(`user ${user.username} was logged out`)
    setUser(null)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addBlog = blogObject => {
    try {
      blogService.create(blogObject).then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    } catch {
      setErrorMessage('could not add blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLike = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      blogService.update(id, updatedBlog).then(returnedBlog => {
        const updatedBlogs = blogs.map((blog) => blog.id === returnedBlog.id ? returnedBlog : blog)
        setBlogs(updatedBlogs)
      })
    }
    catch {
      setErrorMessage('could not add like')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    console.log('click', blog)
    if (blog && window.confirm(`Delete blog ${blog.title} by ${blog.author}`)) {
      try {
        blogService.handleDelete(id).then(() => {
          const updatedBlogs = blogs.filter((blog) => blog.id !== id)
          setBlogs(updatedBlogs)
        })
      }
      catch {
        setErrorMessage('could not delete blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  const loginForm = () => (
    <>
      <h1>log in to application</h1>
      <Notification message={message}/>
      <ErrorNotification message={errorMessage} />
      <form onSubmit={handleLogIn}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const loggedInUser = () => (
    <>
      <h2>blogs</h2>
      <Notification message={message}/>
      <ErrorNotification message={errorMessage} />
      <div>
        <p>{user.name} logged in</p>
        <button onClick={() => {handleLogOut()}}>logout</button>
      </div>
      <h2>create new</h2>
      <Togglable buttonLabel="new blog">
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {[...blogs].sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} user={user} handleDelete={handleDelete} />
      )}
    </>
  )

  return (
    <div>
      {!user && loginForm()}
      {user && loggedInUser()}
    </div>
  )
}

export default App