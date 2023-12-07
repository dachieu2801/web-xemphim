const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Booking = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  seatPosition: {
    type: Array,
    required: true
  },
  idShowtimes: {
    type: String,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', Booking);