import MovieList from '../components/movie/MovieList'

import styles from './Content.module.css'

const requests = {
  fetchNetflixOriginals: `http://localhost:5000/movies`,
  fetchTrending: `http://localhost:5000/movies/trending`,
  fetchTopRated: `http://localhost:5000/movies/top-rate`,
  fetchActionMovies: `http://localhost:5000/movies/discover/28`,
  fetchComedyMovies: `http://localhost:5000/movies/discover/35`,
  fetchHorrorMovies: `http://localhost:5000/movies/discover/27`,
  fetchRomanceMovies: `http://localhost:5000/movies/discover/10749`,
  fetchDocumentaries: `http://localhost:5000/movies/discover/99`,
}

function Content() {
  return (
    <div className={styles.wrapper} >
      <div>
        <MovieList origin={requests.fetchNetflixOriginals} />
      </div>
      <div>
        <h2>Xu hướng</h2>
        <MovieList request={requests.fetchTrending} />
      </div>
      <div>
        <h2>Xếp hạng cao</h2>
        <MovieList request={requests.fetchTopRated} />
      </div>
      <div>
        <h2>Hành động</h2>
        <MovieList request={requests.fetchActionMovies} />
      </div>
      <div>
        <h2>Hài</h2>
        <MovieList request={requests.fetchComedyMovies} />
      </div>
      <div>
        <h2>Kinh dị</h2>
        <MovieList request={requests.fetchHorrorMovies} />
      </div>
      <div>
        <h2>Lãng mạn</h2>
        <MovieList request={requests.fetchRomanceMovies} />
      </div>
      <div>
        <h2>Tài liệu</h2>
        <MovieList request={requests.fetchDocumentaries} />
      </div>
    </div>
  )
}

export default Content