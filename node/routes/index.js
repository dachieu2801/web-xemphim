const Movies = require('./movie');
const ShowTime = require('./showtime');
const Cinema = require('./cinema');

function route(app) {
  app.use('/movies', Movies);
  app.use('/showtime', ShowTime);
  app.use('/cinema', Cinema);

  app.use('/', (req, res, next) => {
    res.status(404).json({
      message: "Page not found"
    })
  })
}

module.exports = route; 
