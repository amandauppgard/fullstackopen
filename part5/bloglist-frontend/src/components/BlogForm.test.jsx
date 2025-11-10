import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { test } from 'vitest'

test('when creating a new blog the event handler recieves the right props', async () => {
  const mockHandler = vi.fn()

  render(<BlogForm createBlog={mockHandler} />)

  const user = userEvent.setup()

  await user.type(screen.getByLabelText('title:'), 'A good title')
  await user.type(screen.getByLabelText('author:'), 'Established author')
  await user.type(screen.getByLabelText('url:'), 'http://localhost:3001')
  await user.click(screen.getByText('submit'))

  expect(mockHandler.mock.calls[0][0].title).toBe('A good title')
  expect(mockHandler.mock.calls[0][0].author).toBe('Established author')
  expect(mockHandler.mock.calls[0][0].url).toBe('http://localhost:3001')

})