import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from "./reducers/notificationReducer";
import { appendBlogs, deleteBlog, initializeBlogs, likeBlog } from "./reducers/blogReducer";
import { initializeUser, loginUser, logoutUser } from "./reducers/userReducers";

const Notification = () => {
  const message = useSelector(state => state.notification.message)
  const type = useSelector(state => state.notification.type)

  if (!message) return null
  return <div className={`notification-${type}`}>{message}</div>;
};


const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch]);


  const handleLogIn = async (event) => {
    event.preventDefault();
    dispatch(loginUser(username, password))
  };

  const handleLogOut = async () => {
    dispatch(logoutUser(user))
  };

  const addBlog = (blogObject) => {
    dispatch(appendBlogs(blogObject))
    dispatch(setNotification(`You added ${blogObject.title} by ${blogObject.author}`, 5, 'success'))
  };

  const handleLike = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`You liked ${blog.title}`, 5, 'success'))
  };

  const handleDelete = (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    if (blog && window.confirm(`Delete blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
      dispatch(setNotification(`Successfully deleted ${blog.title} by ${blog.author}`, 5, 'success'))
    }
  };

  const loginForm = () => (
    <>
      <h1>log in to application</h1>
      <Notification />
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
  );

  const loggedInUser = () => (
    <>
      <h2>blogs</h2>
      <Notification />
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
      <h2>create new</h2>
      <Togglable buttonLabel="new blog">
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            user={user}
            handleDelete={handleDelete}
          />
        ))}
    </>
  );

  return (
    <div>
      {!user && loginForm()}
      {user && loggedInUser()}
    </div>
  );
};

export default App;
