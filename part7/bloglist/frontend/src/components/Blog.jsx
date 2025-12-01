import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'


const Blog = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const { id } = useParams()
  const blog = blogs.find(b => b.id === id)
  const dispatch = useDispatch()

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

  if (!blog) return null


  return (
    <div >
      <h2>{blog.title}</h2>
      <a href={blog.url} >{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
      added by {blog.author}
      <div>
      {blog.user && (blog.user.username === user.username) ? (
        <button onClick={() => handleDelete(blog.id)}>delete</button>
      ) : (
        <></>
      )}
      </div>
    </div>
  )
}

export default Blog