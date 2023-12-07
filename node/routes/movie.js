
const express = require('express');

const moviesControllers = require('../controllers/movies');

const router = express.Router();

//search
router.post('/search/', moviesControllers.search);

//trailer//  movies/video    => post
router.post('/video/', moviesControllers.postVideo);
// router.get('/video', moviesControllers.getVideo);

// /movies/discover => get
router.get('/discover/:with_genres/:page/:userToken', moviesControllers.discover);
router.get('/discover/:with_genres/:userToken', moviesControllers.discover);
router.get('/discover/:userToken', moviesControllers.discover);

// /movies/top-rate => get
router.get('/top-rate/:page/:userToken', moviesControllers.topRate);
router.get('/top-rate/:userToken/', moviesControllers.topRate);

// /movies/trending => get
router.get('/trending/:page/:userToken', moviesControllers.trending);
router.get('/trending/:userToken', moviesControllers.trending);

router.get('/:page/:userToken', moviesControllers.index);
router.get('/:userToken', moviesControllers.index);

module.exports = router;
