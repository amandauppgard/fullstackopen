import { useState } from 'react'

const BlogInformation = ({ blog, isVisible, handleLike, user, handleDelete }) => {
  if (isVisible) {
    return(
      <div>
        <p>{blog.url}</p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p>likes {blog.likes} </p>
          <button onClick={() => handleLike(blog.id)}>like</button>
        </div>
        <p>{blog.user ? blog.user.username : 'No user'}</p>
        {blog.user && (blog.user.username === user.username) ? (
          <button onClick={() => handleDelete(blog.id)}>delete</button>
        ) : (
          <></>
        )}
      </div>
    )
  }
}

const Blog = ({ blog, handleLike, user, handleDelete }) => {
  const [isVisible, setIsVisible] = useState(false)

  const blogStyle = {
    paddingBlock: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog' >
      <span>{blog.title}</span> <span>{blog.author}</span>
      <button onClick={() => setIsVisible(!isVisible)}>{!isVisible ? 'view' : 'hide' }</button>
      <BlogInformation blog={blog} isVisible={isVisible} handleLike={handleLike} user={user} handleDelete={handleDelete} />
    </div>
  )
}

export default Blog