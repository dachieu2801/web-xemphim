import { useState, useEffect } from 'react';
import URL from '../../../url'
import styles from './Banner.module.css'

function Banner(props) {

  //chứa data 
  const [banner, setBanner] = useState('')

  //getdata
  useEffect(() => {
    const fetchNetflixOriginals = async () => {
      try {
        const response = await fetch(`${URL}movies/trending`);
        const responseData = await response.json();
        //lỗi sai nếu có
        if (responseData.message) {
          throw new Error(responseData.message);
        }
        const newData = responseData.results
        // lấy Banner
        let i = Math.floor(Math.random() * newData.length)
        // console.log(i);
        setBanner(newData[i])
        // console.log(newData[i]);
      }
      catch (err) {
        console.log(err.message);
      }
    }
    fetchNetflixOriginals()
  }, []);

  return (
    <div
      style={{ background: `url(https://image.tmdb.org/t/p/original${banner.backdrop_path || banner.poster_path})  center ` }}
      className={styles.wrapper}
    >
      <div className={styles.detail} >
        <h1>{banner.name}</h1>
        <button>Play</button>
        <button>My List</button>
        <p>{banner.overview}</p>
      </div>
    </div>
  )
}

export default Banner