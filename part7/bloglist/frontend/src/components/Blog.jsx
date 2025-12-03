import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteBlog, likeBlog, addComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useState } from 'react'
import { Button, Input } from '../styled'


const Blog = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [comment, setComment] = useState('')
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

  const handleNewComment = () => {
    const blog = blogs.find((blog) => blog.id === id);
    if (blog) {
      dispatch(addComment(blog.id, comment))
      setComment('')
      dispatch(setNotification(`Successfully added comment`, 5, 'success'))
    }
  }

  if (!blog) return null


  return (
    <div >
      <h2>{blog.title}</h2>
      <a href={blog.url} >{blog.url}</a>
      <div>
        {blog.likes} likes
        <Button onClick={() => handleLike(blog)}>like</Button>
      </div>
      added by {blog.author}
      <div>
      {blog.user && (blog.user.username === user.username) ? (
        <Button onClick={() => handleDelete(blog.id)}>delete</Button>
      ) : (
        <></>
      )}
      <h3>comments</h3>
      <Input placeholder='Add comment' value={comment} onChange={(e) => setComment(e.target.value)}/>
      <Button onClick={() => handleNewComment()} >add comment</Button>
      {blog.comments ? (
        <ul>
          {blog.comments.map((comment, i) => (
            <li key={i}>{comment}</li>
          )) }
        </ul>
      ) : (
        <></>
      )}
      </div>
    </div>
  )
}

export default Blog