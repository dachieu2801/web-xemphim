const express = require('express');
const router = express.Router();

const ShowtimeController = require('../controllers/showtime');
router.post('/add', ShowtimeController.addShowtime);


module.exports = router;
