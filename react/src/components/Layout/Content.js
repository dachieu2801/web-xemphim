import MovieList from '../components/movie/MovieList'
import URL from '../../url'
import styles from './Content.module.css'

const requests = {
  fetchNetflixOriginals: `${URL}movies`,
  fetchTrending: `${URL}movies/trending`,
  fetchTopRated: `${URL}movies/top-rate`,
  fetchActionMovies: `${URL}movies/discover/28`,
  fetchComedyMovies: `${URL}movies/discover/35`,
  fetchHorrorMovies: `${URL}movies/discover/27`,
  fetchRomanceMovies: `${URL}movies/discover/10749`,
  fetchDocumentaries: `${URL}movies/discover/99`,
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