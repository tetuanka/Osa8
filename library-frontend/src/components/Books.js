import { useState } from 'react'
import { ALL_BOOKS } from '../queries'
import { ALL_GENRES } from '../queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const [page, setPage] = useState(null)

  const result = useQuery(ALL_BOOKS, {variables: { genre:page }}, { pollInterval: 2000}, {
  })
  const result2 = useQuery(ALL_GENRES, { pollInterval: 2000})

  if (result.loading)  {
    return <div>loading...</div>
  }
  if (result2.loading)  {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const books = result.data.allBooks
  const genres = result2.data.allGenres

  if (page===null) 
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
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => ( 
      <button key={g} onClick={() => setPage(g)}>{g}</button>
      ))}

      <button onClick={() => setPage(null)}>all</button>
    </div>
    
  )

  for(let i=0; i<genres.length; i++){ 
    if(page===genres[i]) return(
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
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {genres.map((g) => ( 
        <button key={g} onClick={() => setPage(g)}>{g}</button>
        ))}
        <button onClick={() => setPage(null)}>all</button>
  
      </div>
      
    )
  }
}

export default Books
