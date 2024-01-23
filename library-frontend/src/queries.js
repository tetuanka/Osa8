import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      id
      bookCount
    }
  }
`

export const ALL_USERS = gql`
  query {
    allUsers  {
      username
      favoriteGenre
    }
  }
`

export const ALL_GENRES= gql`
  query {
    allGenres
  }
`

export const ME= gql`
query {
    me {
        username
        favoriteGenre
    }
}
`

export const ALL_BOOKS = gql`
  query AllBooks($genre: String)  {
    allBooks(genre: $genre)  {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int! $genres: [String!]) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author {
        name
    }
    id
    published
    genres
  }
}
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born)  {
      name
      born
      bookCount
      id
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