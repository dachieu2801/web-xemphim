import InputSearch from './Input-context'
import { useState } from 'react'

function InputProvider(props) {
  const [inputSearch, setInputSearch] = useState()
  return (
    <InputSearch.Provider value={[inputSearch, setInputSearch]}>
      {props.children}
    </InputSearch.Provider>
  )
}

export default InputProvider