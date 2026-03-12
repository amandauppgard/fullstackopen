import { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client/react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, EDIT_BIRTHYEAR } from './queries'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.clearStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={() => handleLogout()}>logout</button>
          </>
        ) : (
          <>
            <button onClick={() => setPage('login')}>login</button>
          </>
        )}
      </div>

      <Authors show={page === 'authors'} authors={authors.data?.allAuthors } EDIT_BIRTHYEAR={EDIT_BIRTHYEAR} ALL_AUTHORS={ALL_AUTHORS} />

      <Books show={page === 'books'} books={books.data?.allBooks} />

      <NewBook show={page === 'add'} ALL_BOOKS={ALL_BOOKS} ALL_AUTHORS={ALL_AUTHORS} CREATE_BOOK={CREATE_BOOK} />

      <Login show={page === 'login'} setToken={setToken} />

      <Recommend show={page === 'recommend'} books={books.data?.allBooks} />
    </div>
  )
}

export default App
