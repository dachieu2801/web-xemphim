const express = require('express');
const router = express.Router();

const CinemaController = require('../controllers/cinema');
router.get('/release', CinemaController.release);
router.patch('/ticket', CinemaController.changeSeat);
router.get('/:id', CinemaController.detail);


module.exports = router;
