const path = require('path');

const express = require('express');

const port = 5000

const app = express();

//cho liên kết API
const cors = require('cors');
app.use(cors());


const route = require('./routes');

//đọc boy
app.use(express.urlencoded({ extended: true }));
//đọc data json
app.use(express.json())

route(app)

app.listen(port);
