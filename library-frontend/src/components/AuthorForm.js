import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'


import Select from 'react-select';

const AuthorForm = (props) => {
    
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ changeBorn ] = useMutation(EDIT_AUTHOR)

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    changeBorn({ variables: { name, born: parseInt(born) } })

    setName('')
    setBorn('')

  }

  let options=[]
  for(let i=0; i<props.authors.length; i++){
    options[i]={value: props.authors[i].name, label: props.authors[i].name  }
  }


  return (
    <div>
      <h2>set birthyear</h2>

      <form onSubmit={submit}>
        <div>
        {' '} <Select
            options={options}
            onChange={(e) => {setName(e.value)}}
            />
        </div>
        <div>
          born {' '} <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorForm