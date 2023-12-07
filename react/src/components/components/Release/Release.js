import { useState, useEffect } from 'react';
import URL from '../../../url'
import './Release.css'
import { useNavigate } from 'react-router-dom';

function Release() {
  const navigate = useNavigate()
  const [movies, setMovies] = useState()


  useEffect(() => {
    const fetchData = async (e) => {

      const response = await fetch(`${URL}cinema/release`)
      const responseData = await response.json()
      if (responseData.showTimes) {
        setMovies(responseData.showTimes)
        console.log(responseData.showTimes);
      }
    }
    fetchData()
  }, [])


  if (movies)
    return (
      <div className='wrapper'>
        <h2 className='title'>Buy Ticket</h2>
        <div className='wrapper-section'>
          {movies.map(movie => (
            <div key={movie._id} className='item'
              onClick={()=>navigate(`/book/${movie._id}`)}
            >
              <img
                width='100%'
                // onClick={() => { handleData(data) }}
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
              />
              <p className='buyticket' >Buy Ticket</p>
              <div className='section'>
                <p><strong>{movie.title}</strong></p>
                <div>
                  <span>{movie.movieTime}h </span>
                  <span>{movie.movieDate}</span>
                </div>
              </div>
            </div>
          ))
          }
        </div>
      </div>
    );
}

export default Release