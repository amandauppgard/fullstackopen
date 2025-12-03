import { useState } from 'react'
import { Button, Input } from '../styled'

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
    <form onSubmit={addBlog} style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
        <label>
        title:
          <Input
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </label>
        <label>
        author:
          <Input
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </label>
        <label>
        url:
          <Input
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </label>
      <Button type="submit">submit</Button>
    </form>
  )
}

export default BlogForm