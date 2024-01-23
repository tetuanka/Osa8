import { useState } from 'react'
import { ME } from '../queries'
import { useQuery } from '@apollo/client'

const Recommend = (props) => {
const result = useQuery(ME)

if (result.loading)  {
    return <div>loading...</div>
}

if (!props.show) {
  return null
}

  const favGenre = result.data.me.favoriteGenre

  const books = props.books
  const favBooks = books.filter((a) => (a.genres.includes(favGenre)))

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <strong>{result.data.me.favoriteGenre}</strong>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  )
      }


export default Recommend