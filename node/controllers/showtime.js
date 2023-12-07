const Showtime = require('../models/showtimes');
const Movies = require('../models/movies');

module.exports = {
  addShowtime: async (req, res, next) => {

    const movies = Movies.fetchAll()

    const movie = movies.find(m => m.id == req.body.idMovie)

    if (!movie) {
      return res.status(400).json({ message: 'Movie not found' })
    }
    const poster_path = movie.poster_path || movie.backdrop_path
    const title = movie.title || movie.name

    const seats = []
    //ghế
    for (let i = 1; i <= 120; i++) {
      seats.push({
        position: i,
        state: 'available'
      })
    }

    const showtime = new Showtime({
      ...req.body, seats, poster_path, title
    })
    await showtime.save()
    try {
      res.status(200).json({ state: 'oke' });
    } catch (err) {
      res.status(400).json({ message: 'error' });
    }
  },
}