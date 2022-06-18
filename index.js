var admin = require("firebase-admin");

var serviceAccount = require("C:\\Users\\josep\\Documents\\rPlaceClone\\rplaceclone.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rplaceclone-default-rtdb.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("/");

ref.once("value", function (snapshot) {
  var data = snapshot.val();   //Data is in JSON format.
});


const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/templates/place.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('gridStatus', (grid) => {
    socket.broadcast.emit('newGrid', grid);
    ref.set(grid);
  });

  socket.on('checkPlacementAllowance', (data) => {
    if(data.timeLeft == 0 || data.timeLeft < -1) {
      socket.emit('allowPlacement', true);
    }
    else {
      socket.emit('allowPlacement', false);
    }
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});