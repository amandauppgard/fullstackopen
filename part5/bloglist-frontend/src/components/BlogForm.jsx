import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <label>
        title:
          <input
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </label>
        <label>
        author:
          <input
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </label>
        <label>
        url:
          <input
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit">submit</button>
    </form>
  )
}

export default BlogForm