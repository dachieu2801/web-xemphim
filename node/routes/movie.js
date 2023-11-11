const path = require('path');

const express = require('express');


const moviesControllers = require('../controllers/movies');

const router = express.Router();
const auth = require('../middleware/authentication');


//search
router.post('/search/', auth, moviesControllers.search);

//trailer//  movies/video    => post
router.post('/video/', auth, moviesControllers.postVideo);
// router.get('/video', moviesControllers.getVideo);

// /movies/discover => get
router.get('/discover/:with_genres/:page/:userToken', auth, moviesControllers.discover);
router.get('/discover/:with_genres/:userToken', auth, moviesControllers.discover);
router.get('/discover/:userToken', auth, moviesControllers.discover);

// /movies/top-rate => get
router.get('/top-rate/:page/:userToken', auth, moviesControllers.topRate);
router.get('/top-rate/:userToken/', auth, moviesControllers.topRate);

// /movies/trending => get
router.get('/trending/:page/:userToken', auth, moviesControllers.trending);
router.get('/trending/:userToken', auth, moviesControllers.trending);

router.get('/:page/:userToken', auth, moviesControllers.index);
router.get('/:userToken', auth, moviesControllers.index);

module.exports = router;
