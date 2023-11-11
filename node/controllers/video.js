const video = require('../models/videoList');

exports.index = (req, res, next) => {
  res.json(video);
};