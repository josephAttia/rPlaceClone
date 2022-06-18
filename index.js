var admin = require("firebase-admin");

var serviceAccount = require("C:\\Users\\josep\\Documents\\rPlaceClone\\rplaceclone.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rplaceclone-default-rtdb.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("/");
var currentGirdStatus;
// print all the data from the database
ref.once("value", function(snapshot) {
    currentGirdStatus = snapshot.val();
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

  socket.on('userJoined', () => {
    socket.emit('serveGrid', currentGirdStatus);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });


  socket.on('gridStatus', (grid) => {
    currentGirdStatus = grid;
    socket.broadcast.emit('newGrid', grid);
    ref.set(grid);
  });

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});