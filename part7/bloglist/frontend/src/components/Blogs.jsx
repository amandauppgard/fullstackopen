import { useDispatch } from "react-redux";
import { appendBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link } from "react-router-dom";
import { BlogItem, BlogList } from "../styled";

const Blogs = ({user, blogs }) => {
  if (!user) return null
  const dispatch = useDispatch()

  const addBlog = (blogObject) => {
    dispatch(appendBlogs(blogObject))
    dispatch(setNotification(`You added ${blogObject.title} by ${blogObject.author}`, 5, 'success'))
  };

  return (
    <>
      <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
        <h2>Create new</h2>
        <Togglable buttonLabel="new blog">
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
      <BlogList>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <BlogItem key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
            </BlogItem>
          ))}
      </BlogList>
    </>
  )
}

export default Blogs