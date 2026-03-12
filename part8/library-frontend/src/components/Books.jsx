import React from 'react'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = React.useState(null)
  const bookResult = useQuery(ALL_BOOKS, {
    variables: { genre }

  })

   React.useEffect(() => {
    bookResult.refetch()
  }, [genre])

  if (!props.show) {
    return null
  }

  const books = bookResult.data?.allBooks || []

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setGenre('refactoring')}>refactoring</button>
        <button onClick={() => setGenre('agile')}>agile</button>
        <button onClick={() => setGenre('patterns')}>patterns</button>
        <button onClick={() => setGenre('design')}>design</button>
        <button onClick={() => setGenre('crime')}>crime</button>
        <button onClick={() => setGenre('classic')}>classic</button>
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
