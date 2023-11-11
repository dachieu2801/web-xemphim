import { useState, useRef, useContext } from 'react'
import IconSearch from '../NavBar/IconSearch'
import InputSearch from '../../../store/Input-context'

import styles from './SearchForm.module.css'

function SearchForm(props) {

  const [inputSearch, setInputSearch] = useContext(InputSearch)

  const [isErr, setIsErr] = useState(false)

  const refInput = useRef()

  function searchHandle(e) {
    e.preventDefault()
    if (refInput.current.value.trim() === '') {
      setIsErr(true)
    } else {
      setInputSearch(refInput.current.value)
      setIsErr(false)
      refInput.current.value = ''
    }
  }



  return (
    <div className={styles.wrapper}>
      <form >
        <div className={styles.section}>
          <input className={isErr ? styles.err : ''}
            ref={refInput}
            placeholder={isErr ? 'Please enter your keyword' : 'Search'}
          // onChange={inputHandle}
          />
          <div
            className={styles.icon}
            onClick={searchHandle}
          >
            <IconSearch color='#ccc' />
          </div>
        </div>
        <div className={styles.button}>
          <button >RESET</button>
          <button onClick={searchHandle}>SEARCH</button>
        </div>
      </form>
    </div>

  )
}

export default SearchForm
// onClick={toSearch}