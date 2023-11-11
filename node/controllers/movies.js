const Movies = require('../models/movies');
const paging = require('../utils/paging');

const Genre = require('../models/genreList')

//exports
const exportsType = (data, req, res, message = 'Not found movies') => {
  const perPage = 20; // số lượng sản phẩm xuất hiện trên 1 page
  const total_pages = Math.ceil(data.length / 20)
  const page = req.params.page || req.body.page || 1;
  // movies hiển thị
  const dataRender = paging(data, perPage, page)
  if (dataRender[0] === undefined) {
    res.status(404).json({ message });
  } else {
    res.status(200).json({
      total_pages,
      page,
      results: dataRender
    });
  }
}

exports.index = (req, res, next) => {
  const movies = Movies.fetchAll();
  exportsType(movies, req, res)
};

//trending
exports.trending = (req, res, next) => {
  const moviesTrend = Movies.trending();
  exportsType(moviesTrend, req, res);
};

// vote_average
exports.topRate = (req, res, next) => {
  const movieTopRate = Movies.topRate();
  exportsType(movieTopRate, req, res)
};

//discover
exports.discover = (req, res, next) => {
  const idDiscover = req.params.with_genres;
  if (!idDiscover) {
    res.status(400).json({ message: 'Not found gerne parram' });
  }
  const movieDiscover = Movies.discover(Number(idDiscover));
  exportsType(movieDiscover, req, res, 'Not found that gerne id')
};


//video
exports.postVideo = (req, res, next) => {
  const idVideo = req.body.film_id;
  if (!idVideo) {
    res.status(400).json({ message: 'Not found film_id parram' });
  }
  const video = Movies.postVideo(Number(idVideo));
  if (video) {
    res.status(200).json({ results: video })
  } else {
    res.status(404).json({ message: 'Not found video' })
  }
};

//search
const isEnter = (type) => {
  if (type) {
    return type
  }
}
exports.search = (req, res, next) => {
  if (!req.body.keyword) {
    res.json({ message: 'Please enter keyword' })
  }
  const keyWord = req.body.keyword.toUpperCase()
  //gẻnre
  let genreId
  if (req.body.genre) {
    genreId = Genre.genreId(req.body.genre)
  }
  
  const mediaType = isEnter(req.body.mediaType)
  const language = isEnter(req.body.language)
  const year = isEnter(req.body.year)

  const moviesSearch = Movies.search(keyWord, genreId, mediaType, language, year);
  exportsType(moviesSearch, req, res);
};