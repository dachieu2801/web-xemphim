const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data', 'movieList.json')
//list movies
const movies = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
//trailer
const videos = require('./videoList')
let video
//genre
//sỏrt data
const sortData = (key) => {
  const data = [...movies]
  data.sort((a, b) => b[key] - a[key])
  return data;
}

module.exports = class Movies {
  static fetchAll() {
    return movies;
  }

  //movies
  //trending
  static trending() {
    return sortData('popularity');
  }

  //top-rate
  static topRate() {
    return sortData('vote_average');
  }
  //discover
  static discover(id) {
    const data = [...movies]
    const dataRender = data.filter(movie => movie['genre_ids'].includes(id))
    return dataRender
  }


  //video
  static postVideo(id) {
    const videoID = videos.find(a => a.id === id)
    if (!videoID) {
      return video
    } else {
      const videoRender = videoID.videos.filter(a => a.official === true)
        .filter(b => b.site === 'YouTube')
        .filter(c => c.type === 'Trailer')
      if (videoRender) {
        video = videoRender[0]
        return video
      } else {
        const videoRender1 = videoRender.filter(a => a.type === 'Teaser')
        video = videoRender1[0]
        return video
      }
    }
  }

  // static getVideo() {
  //   return video
  // }

  // search
  static search(keyWord, genreId, mediaType, language, year) {

    let moviesSearch = movies.filter(movie => {
      const title = movie.title || movie.name
      return title.toUpperCase().includes(keyWord) || movie.overview.toUpperCase().includes(keyWord)
    })
    if (genreId) {
      moviesSearch = moviesSearch.filter(movie => movie['genre_ids'].includes(genreId))
    }
    if (mediaType && mediaType !== 'all') {
      moviesSearch = moviesSearch.filter(movie => movie.media_type === mediaType)
    }
    if (language) {
      moviesSearch = moviesSearch.filter(movie => movie.original_language === language)
    }
    if (year) {
      moviesSearch = moviesSearch.filter(movie => {
        const date = movie['release_date'] || movie['first_air_date']
        if (date) {
          return date.includes(year)
        } else
          return
      })
    }
    return moviesSearch
  }
}
