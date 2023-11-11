import React, { useState, useCallback, useEffect } from "react"
import MovieDetail from './MovieDetail'
import ScrollContainer from 'react-indiana-drag-scroll'

import styles from './MovieList.module.css'

function MovieList(props) {
  //data
  const [datas, setDatas] = useState()
  //mes Err
  const [errMes, setErrMes] = useState('')
  //xem data có phải origin k
  const [isOrigin, setIsOrigin] = useState(false)
  //loading
  const [isLoading, setIsLoading] = useState(false)
  //xem có hiện detail k
  const [isdetailMovie, setIsDetailMovie] = useState(false)
  //detail video click
  const [detailMovie, setDetailMovie] = useState()

  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState('')
  //sử lí data
  useEffect(() => {
    if (props.origin) {
      setIsOrigin(true)
    }
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`${props.request || props.origin}/${page}/RYoOcWM4JW`);
        const responseData = await response.json();
        //lỗi sai nếu có
        if (responseData.message) {
          throw new Error(responseData.message);
        }
        const newData = responseData.results
        setDatas(newData)
        setTotalPage(responseData.total_pages)
        setIsLoading(false)

      }
      catch (err) {
        setErrMes(err.message)
        setIsLoading(false)
      }
    }
    fetchData()

  }, [page]);

  //sử lí ẩn hiện detail
  function handleData(data) {
    setIsDetailMovie(true)
    if (data === detailMovie) {
      setIsDetailMovie(!isdetailMovie)
      // setIsDetailMovie(!isdetailMovie)
      setDetailMovie(data)
    }
    if (data !== detailMovie) {
      setDetailMovie(data)
    }
  }

  //pagingHandler
  function pagingHandler() {
    return (
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
      </div >
    )
  }
  // khi có lỗi
  if (errMes) {
    return (
      <div className={styles.wrapper}>
        <p>{errMes}</p>
      </div>
    )
  }
  //loading
  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <p>Loading...</p>
      </div>
    )
  }
  // nếu k có video
  if (!datas) {
    return (
      <div className={styles.wrapper}>
        <p>There are no movies for this category.</p>
      </div>
    )
  }

  //k lỗi
  if (datas.length > 0) {
    return (
      <React.Fragment>
        <ScrollContainer className={styles.wrapper} hideScrollbars='false'>
          {
            datas.map((data) => (
              <img
                onClick={() => { handleData(data) }}
                key={data.id}
                src={`https://image.tmdb.org/t/p/original${isOrigin ? data.poster_path : data.backdrop_path}`}
                alt='1'
                className={isOrigin ? styles.origin : styles.other}
              />
            ))
          }
        </ScrollContainer>
        {isdetailMovie ? <MovieDetail movie={detailMovie} /> : null}
        {pagingHandler()}
      </React.Fragment>
    )
  }
}

export default MovieList