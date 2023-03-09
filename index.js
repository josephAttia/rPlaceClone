var admin = require("firebase-admin");
const slowDown = require("express-slow-down");

var currentGirdStatus;

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.enable("trust proxy"); 
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 150, // allow 100 requests per 15 minutes, then...
  delayMs: 500 // begin adding 500ms of delay per request above 100:
});

app.use(speedLimiter);


var path = require('path');

// Initialize the app and connecting with the firebase database
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rplaceclone-default-rtdb.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("/");


//getting the database values and storing them the currentGridStatus 
ref.once("value", function (snapshot) {
  currentGirdStatus = snapshot.val();
});

//this is so we can use external js and css files
app.use(express.static(path.join(__dirname, '/')));

//serve the main html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/templates/place.html');
});

var timeleft = 10;
//on the user connected
io.on('connection', (socket) => {
  console.log('a user connected');
  //serve rhe grid status from the firebase to the newly joined user (only called once on page load on the client side)
  socket.on('userJoined', () => {
    socket.emit('serveGrid', currentGirdStatus);
  });

  //on the user disconnected then just print it out
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });


  socket.on('gridStatus', (data) => {
    currentGirdStatus = data.wholeGrid;
    socket.broadcast.emit('newPixel', {
      x: data.x,
      y: data.y,
      color: data.color
    });
    ref.set(currentGirdStatus);
  });

  socket.on('decrementTime', () => {
    decrementTime();
  });
  
  function decrementTime() {
    timeleft -= 1;
  }
  
  socket.on('resetTimer', () => {
    timeleft = 10;
  });
  
  
  socket.on('checkTimerValue', () => {
    socket.emit('timerValue', timeleft);
  });
  
  
  
});


server.listen(process.env.PORT || 5000, () => {
  console.log('listening on *:3000');
});
