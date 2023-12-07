const env = require('./env')
const path = require('path');

const express = require('express');

const port = Number(env.PORT) || 5000

const app = express();

//link mongooseDB
const db = require('./conf/db');
db.main();

//cho liên kết API
const cors = require('cors');
app.use(cors());

//đọc boy
app.use(express.urlencoded({ extended: true }));
//đọc data json
app.use(express.json())

const route = require('./routes');
route(app)

const { Server } = require('socket.io');
//socket
const server = require('http').createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

////////////////////////////

io.on('connection', async (socket) => {
  console.log("New client connected" + socket.id);
  //lắng lắngnghe thay doi cinema
  socket.on('hasticket', (_id) => {
    io.emit(_id, 'Has change')
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
  });
});

server.listen(port)
