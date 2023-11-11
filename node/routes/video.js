
const path = require('path');

const express = require('express');

const videoControllers = require('../controllers/video');

const router = express.Router();

// /video => get
router.get('/', videoControllers.index);

module.exports = router;
