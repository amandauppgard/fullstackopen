import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from "./reducers/notificationReducer";
import { appendBlogs, deleteBlog, initializeBlogs, likeBlog } from "./reducers/blogReducer";
import { initializeUser, loginUser, logoutUser } from "./reducers/userReducers";
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useNavigate,
  useParams
} from 'react-router-dom'
import { initializeUsers } from "./reducers/usersReducer";

const Notification = () => {
  const message = useSelector(state => state.notification.message)
  const type = useSelector(state => state.notification.type)

  if (!message) return null
  return <div className={`notification-${type}`}>{message}</div>;
};

const Home = ({user, blogs }) => {
  if (!user) return null
  const dispatch = useDispatch()

  const addBlog = (blogObject) => {
    dispatch(appendBlogs(blogObject))
    dispatch(setNotification(`You added ${blogObject.title} by ${blogObject.author}`, 5, 'success'))
  };

  const blogStyle = {
    paddingBlock: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <>
      <h2>create new</h2>
      <Togglable buttonLabel="new blog">
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
          </div>
        ))}
    </>
  )
}

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()

  const handleLogIn = async (event) => {
    event.preventDefault();
    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
  };

  return (
    <>
      <h1>log in to application</h1>
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
}

const Users = () => {
  const users = useSelector(state => state.users)

  if (!users || users.length === 0) {
    return <p>No users</p>
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th scope='col'>User</th>
            <th scope='col'>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const User = () => {
  const users = useSelector(state => state.users)
  const { id } = useParams()
  const user = users.find(u => u.id === id)

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [dispatch]);

  const handleLogOut = async () => {
    dispatch(logoutUser(user))
    useNavigate('/login')
  };

  return (
    <Router>
      <h1>Blogs</h1>
      { user ? (
      <div>
        <p>{user.name} logged in</p>
        <button
          onClick={() => {
            handleLogOut();
          }}
        >
          logout
        </button>
      </div>
      ) : (
        <></>
      )}
      <Notification />
      <Routes>
        <Route path='/' element={<Home blogs={blogs} user={user} />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/blogs/:id' element={<Blog />} />
      </Routes>
    </Router>
  );
};

export default App;
