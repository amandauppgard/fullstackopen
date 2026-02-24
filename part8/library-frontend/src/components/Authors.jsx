import { useState } from "react"
import { useMutation } from '@apollo/client/react'


const Authors = (props) => {
  const [year, setYear] = useState('')
  const [author, setAuthor] = useState('')
  const [updateYear] = useMutation(props.EDIT_BIRTHYEAR, {refetchQueries: [{query: props.ALL_AUTHORS}]})

  if (!props.show) {
    return null
  }
  const authors = props.authors || []

  const submit = (event) => {
    event.preventDefault()

    if(author === '') {
      return
    }

    updateYear({
      variables: {
        name: author,
        setBornTo: Number(year)
      }
    }
    )

    setAuthor('')
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <label>
            name
            <select
              value={author}
              onChange={e => setAuthor(e.target.value)}
            >
              <option value=''>Select author</option>
              {authors.map((a) => (
                <option value={a.name}>{a.name}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            born
            <input value={year} onChange={({target}) => setYear(target.value)}/>
          </label>
        </div>
          <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
