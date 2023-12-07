const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Showtime = new Schema({
  idMovie: {
    type: String,
    required: true
  },
  poster_path: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  seats:
    [{
      position: {
        type: Number,
        required: true
      },
      state: {
        type: String,
        required: true
      }
    }]
  ,
  movieTime: {
    type: String,
    required: true
  },
  movieDate: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Showtime', Showtime);