import { useDispatch } from "react-redux";
import { appendBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link } from "react-router-dom";

const Blogs = ({user, blogs }) => {
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
          <div style={blogStyle} key={blog.id} >
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
          </div>
        ))}
    </>
  )
}

export default Blogs