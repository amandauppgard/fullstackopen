import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      bookCount
      name
      born
      id
    }
  }
`

export const ALL_BOOKS = gql`
query allBooks($genre: String) {
  allBooks(genre: $genre) {
    title
    published
    author {
      name
    }
    id
  }
}
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`

export const EDIT_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int! ) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title,
      author {
        name
      },
      published,
      genres,
      id
    }
  }
`