import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(appendAnecdote(content))
    dispatch(setNotification(`You added '${content}'`, 5))
  }

  return (
    <div>
        <h2>create new</h2>
        <form onSubmit={addNew}>
            <div>
                <input name="anecdote" />
            </div>
            <button type="submit">create</button>
        </form>
    </div>
  )
}

export default AnecdoteForm
