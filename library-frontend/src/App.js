import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import { gql, useQuery, useMutation, useApolloClient } from '@apollo/client'
import AuthorForm from './components/AuthorForm'
import LoginForm from './components/LoginForm'

import { ALL_AUTHORS } from './queries'
import { ALL_BOOKS } from './queries'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}


const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  const result2 = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  if (result.loading)  {
    return <div>loading...</div>
  }
  if (result2.loading)  {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
        <Authors show={page === 'authors'} authors={result.data.allAuthors} />
        <Books show={page === 'books'} books={result2.data.allBooks} />
        <LoginForm show={page === 'login'} setToken={setToken} setError={notify}  />
      </div>
    )
  }
  if (token && page==='login') setPage('authors')

  return (
    <div>
      <div>
      <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('setyear')}>set birthyear</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <AuthorForm show={page === 'setyear'} authors={result.data.allAuthors}  />

      <Authors show={page === 'authors'} authors={result.data.allAuthors} />

      <Books show={page === 'books'} />

      <Recommend show={page === 'recommend'} books={result2.data.allBooks} token={token} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
