const Movies = require('./movie');

function route(app) {
  app.use('/movies', Movies);
  app.use('/', (req, res, next) => {
    res.status(404).json({
      message: "Route not found"
    })
  })
}

module.exports = route; 
