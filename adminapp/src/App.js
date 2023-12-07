import './App.css';
import { useState } from 'react';


function App() {
  const [idMovie, setIdMovie] = useState()
  const [movieDate, setMovieDate] = useState()
  const [movieTime, setMovieTime] = useState()
  const [err, setErr] = useState()


  const fetchData = async (e) => {
    e.preventDefault()
    setErr('')
    if (!idMovie && !movieDate && !movieTime) {
      setErr('Please enter all field')
    } else {
      const response = await fetch(`https://server-appmovie.onrender.com/showtime/add`, {
        method: 'POST',
        body: JSON.stringify({
          idMovie, movieDate, movieTime
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const responseData = await response.json();
      if (responseData.message) {
        setErr('Server Error')
      } else {
        setIdMovie('')
        setMovieDate('')
        setMovieTime('')
        setErr('Success')
      }
    }
  }

  return (
    <form className='App'>
      <h2 className='title'>Admin App Movie</h2>
      <div>
        <label>Id Movie</label><br />
        <input type='text' placeholder='Enter Id Movie'
          value={idMovie}
          onChange={(e) => setIdMovie(e.target.value.trim())}
        />
      </div><br />
      <div>
        <label>Movie Date (Day/Month)</label><br />
        <input type='text' placeholder='Enter Movie Date'
          value={movieDate}
          onChange={(e) => setMovieDate(e.target.value.trim())}
        />
      </div><br />
      <div>
        <label>Movie Show Time (Houer:Minutes)</label><br />
        <input type='text' placeholder='Enter Movie Show Time'
          value={movieTime}
          onChange={(e) => setMovieTime(e.target.value.trim())}
        />
      </div>
      {err && <div className='state'>{err}</div>}
      <button className='button' onClick={fetchData}>SUBMIT</button>
    </form>
  );
}

export default App;
