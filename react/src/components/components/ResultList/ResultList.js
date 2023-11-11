import React, { useState, useEffect } from "react"
import MovieDetail from '../movie/MovieDetail'

import styles from './ResultList.module.css'
import IconSearch from '../NavBar/IconSearch'

function ResultList() {
  //search
  const [keyword, setKeyword] = useState('')
  const [genre, setGenre] = useState('')
  const [mediaType, setMediaType] = useState('')
  const [language, setLanguage] = useState('')
  const [year, setYear] = useState('')

  // //data
  const [datas, setDatas] = useState([])
  // //loading,xem có data không,khi có data
  const [isLoading, setIsLoading] = useState(false)
  const [mess, setMess] = useState('')

  // xem có hiện detail k
  const [isdetailMovie, setIsDetailMovie] = useState(false)
  // detail video click
  const [detailMovie, setDetailMovie] = useState()

  // /pages/
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState('')

  //dder search
  const [first, setFirst] = useState(true)
  const [search, setSearch] = useState()


  useEffect(() => {
    if (first) {
      setFirst(false)
    } else {
      const fetchData = async () => {
        setDatas([])
        setIsLoading(true)
        setTotalPage('')
        setIsDetailMovie(false)
        const response = await fetch(`http://localhost:5000/movies/search`, {
          method: 'POST',
          body: JSON.stringify({
            keyword, genre, mediaType, language, year, page, userToken: 'RYoOcWM4JW'
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        const responseData = await response.json();
        //lỗi sai nếu có
        console.log(responseData);
        if (responseData.message) {
          setMess(responseData.message)
          setIsLoading(false)
          return
        } else {
          setTotalPage(responseData.total_pages)
          setDatas(responseData.results)
          setIsLoading(false)
          setMess('')
        }
      }
      fetchData()
    }
  }, [page, search])

  // sử lí ẩn hiện detail
  function handleData(data) {
    setIsDetailMovie(true)
    if (data === detailMovie) {
      setIsDetailMovie(!isdetailMovie)
      setDetailMovie(data)
    }
    if (data !== detailMovie) {
      setDetailMovie(data)
    }
  }

  return (

    <React.Fragment>
      <div className={styles.wrapper1}>
        <form >
          <div className={styles.section}>
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value.trim())}
              placeholder={'Search'}
            />
            <div
              className={styles.icon}
              onClick={e => {
                e.preventDefault()
                setSearch(Math.random())
                setPage(1)
              }}
            >
              <IconSearch color='#ccc' />
            </div>
          </div>

          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">Thể loại</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Animation">Animation</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Documentary">Documentary</option>
            <option value="Horror">Horror</option>
            <option value="Family">Family</option>
            <option value="Romance">Romance</option>
            <option value="History">History</option>
          </select>
          <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
            <option value="">Media Type</option>
            <option value='all'>All</option>
            <option value="movie">Movie</option>
            <option value="tv">TV</option>
            <option value="person">Person</option>
          </select>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="">Language</option>
            <option value="en">English</option>
            <option value="ja">Japan</option>
            <option value="ko">Korean</option>
          </select><br />

          <input
            className={styles.search}
            type="number"
            value={year}
            placeholder="Năm phát hành"
            onChange={(e) => setYear(e.target.value)} />

          <div className={styles.button}>
            <button >RESET</button>
            <button onClick={e => {
              e.preventDefault()
              setSearch(Math.random())
              setPage(1)
            }}>SEARCH</button>
          </div>
        </form>
      </div>


      <h2 >Search Result</h2>
      {isLoading && <p>Loading...</p>}
      {mess && <p>{mess}</p>}
      {isdetailMovie ? <MovieDetail movie={detailMovie} /> : null}
      {!mess && <div className={styles.wrapper}>
        {
          datas.map((data) => {
            if (data.poster_path) {
              return (
                <img
                  onClick={() => { handleData(data) }}
                  key={data.id}
                  src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                  alt={`Movie name:           
                  ${data.name}`}
                  className={styles.img}
                />
              )
            }
          })
        }
      </div>}

      {datas.length >= 1 &&
        <div className='wraperPage'>
          <p onClick={e => page === 1 ? null : setPage(page - 1)}>{'<'}</p>
          {page > 2 && <p onClick={e => setPage(Number(e.target.innerHTML))}>1</p>}
          {page > 4 && <p>{'...'}</p>}
          {page > 3 && <p onClick={e => setPage(Number(e.target.innerHTML))}>{page - 2}</p>}
          {page >= 2 && <p onClick={e => setPage(Number(e.target.innerHTML))}>{page - 1}</p>}
          <p onClick={e => setPage(Number(e.target.innerHTML))} style={{ color: '#fff' }}>{page}</p>
          {page <= totalPage - 1 && < p onClick={e => setPage(Number(e.target.innerHTML))}>{page + 1}</p>}
          {page < totalPage - 2 && <p onClick={e => setPage(Number(e.target.innerHTML))}>{page + 2}</p>}
          {page < totalPage - 3 && <p>{'...'}</p>}
          {page < totalPage - 1 && <p onClick={e => setPage(Number(e.target.innerHTML))}>{totalPage}</p>}
          <p onClick={e => page === totalPage ? null : setPage(page + 1)}>{'>'}</p>
        </div >}
    </React.Fragment>
  )
}

export default ResultList
