import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { test } from 'vitest'

test('renders blog title and author, but not likes and url', () => {
  const blog = {
    title: "A good title",
    author: 'Respected Author',
    url:'http://localhost:3001',
    likes: 12
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('A good title Respected Author')
  expect(element).toBeDefined()

  const urlElement = screen.queryByText('url: http://localhost:3001')
  const likesElement = screen.queryByText('likes: 12')
  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})

test('likes and url are rendered after button click', async () => {
  const blog = {
    title: "A good title",
    author: 'Respected Author',
    url:'http://localhost:3001',
    likes: 12
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const urlElement = screen.queryByText('url: http://localhost:3001')
  const likesElement = screen.queryByText('likes: 12')
  expect(urlElement).toBeDefined()
  expect(likesElement).toBeDefined()
})

test('when clicking the like button twice the event handler is called twice', async () => {
  const blog = {
    title: "A good title",
    author: 'Respected Author',
    url:'http://localhost:3001',
    likes: 12
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} handleLike={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
