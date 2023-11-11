import { useState, useEffect } from "react"

import styles from './MovieDetail.module.css'

function MovieDetail(props) {
  // const [data, setData] = useState([])
  const [keyYoutobe, setKeyYoutobe] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  //chứa data của movie mà đã click
  const detailMobie = props.movie
  // film_id
  useEffect(() => {
    setIsLoading(true)
    const fetchDetail = async () => {
      const response = await fetch(`http://localhost:5000/movies/video`, {
        method: 'POST',
        body: JSON.stringify({
          film_id: detailMobie.id,
          userToken: 'RYoOcWM4JW'
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const responseData = await response.json();
      if (responseData.message) {
        console.log(responseData.message);
        return
      }
      const data = responseData.results
      console.log(data);
      setKeyYoutobe(data.key)
      setIsLoading(false)
    }
    fetchDetail()
  }, [props.movie.id]);

  //loading
  if (isLoading) {
    return (
      <div className={styles.load}>
        <p>Loading...</p>
      </div>
    )
  }

  //good job
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1>{detailMobie.title || detailMobie.name}</h1>
        <div className={styles.detail}>
          <p><b>Release Date: {detailMobie['release_date'] ? detailMobie['release_date'] : detailMobie['first_air_date']}</b></p>
          <p><b>Vote: {detailMobie.vote_average} / 10</b></p>
        </div>
        <p>{detailMobie.overview}</p>
      </div>
      {/* nếu đủ d.k thì lấy YTB*/}
      <iframe width="100%" height="400"
        src={`https://www.youtube.com/embed/${keyYoutobe}`}>
      </iframe>
    </div >
  )
}

export default MovieDetail