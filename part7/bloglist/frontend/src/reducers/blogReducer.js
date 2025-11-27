import { createSlice } from "@reduxjs/toolkit"
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },
    like(state, action) {
      const blog = action.payload
      const updatedBlog = state.map(b => b.id !== blog.id ? b : blog)
      return updatedBlog
    },
    setBlogs(state, action) {
      return action.payload
    },
    handleDeleteBlog(state, action) {
      return state.filter(b => b.id !== action.payload)
    }
  }
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const appendBlogs = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(createBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updated = { ...blog, likes: blog.likes + 1 }
    const returned = await blogService.update(blog.id, updated)
    dispatch(like(returned))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const returned = await blogService.handleDelete(id)
    dispatch(handleDeleteBlog(id))
  }
}
export const { createBlog, like, setBlogs, handleDeleteBlog } = blogSlice.actions
export default blogSlice.reducer