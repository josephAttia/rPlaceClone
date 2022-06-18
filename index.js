var admin = require("firebase-admin");

var serviceAccount = {
  "type": "service_account",
  "project_id": "rplaceclone",
  "private_key_id": "3d68dc1e95fbe6592ae24d700d7d20b97b224dbe",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC1LrDOy0V6fupT\nVXiZul7C+8PmmgypvGWa97dbVW1ACqD2nos5WwpP3ndHV/wO4FS02bLwqR3OLssW\ncp9FN4OA3cj8SbWI2Vyr/nKeueD9rQ5a5sDxJjLvhE+GeDpsG8dSzwikBu+SwOPJ\n8BWVj/lztWyEPw2SqlXns5k3Sewb/f4mt+EL/cDbRIJCmh6DjYs5oGKTOXuvVOvn\nj1Us7ku2agfy4mnzPzBByLDE4LwBGkjWpdDV/yyxjlBcZoC+qP+MT2R82owo+8WI\n64qhEnq4iPMtDuSbw7dZrLfGSNcWf29OqNg5yQLMKyTTAoMf99Sfk5zwBCcfarAO\n6JZqn4/nAgMBAAECggEAUuF6cQaskEYZdCiPpCcMrT5VVZpXu5ealSLHRikUcmzK\nSDarcn/SfknCn6jAfZ+iMB68C/oYz9Y5AdpKQHQOHHeYNsyTFfh0u5sInNJj+Tde\nbzfKwCWcvFN2u4kpFIY6jod1qO8hTa0eJqTEgufbEVLHQtHDKDnyVS0jpBaVQxIM\nB+tqzcSxWEGsHtGuv+eVvbu2iIDyTnQkPNcjisBxamSMJj9QkTL90pilA0vQwBfv\nvBY2NYgR0qMCfSxAy4afX86laZnXBVxCdJEN2yw7KkzjUUwTifkyrl0J20S7516Y\n1HHwZHC1QocrZfEz74vvd/oU4+cbKHGNaHAgYs9QaQKBgQD+2s2SwJ0mpupdCHIv\nsjW/v5mhxDIm7rPA7VQIN4lMchJrHcmZl7OqCAeYaYhku2NLnZ7japleHcGI6CwI\nSEYCYzvJV3dAbesoDXOgSKdONuOirZrxJqRmzjztRn9YxKDdWdMjbTG4P1WjhDeQ\nwl2vz8rqrKfrWWRRQcGyRBwWzwKBgQC1/yGp0edH+h1nMTv3FlHKYYT0nS5xK/It\nZgKDCtYk2n/jIxtX073p7IWk/1dd9qqHF3ok1i6PTONIdCQUxQDT53Cp/UGCcrBU\nPksySktLVAq4Z7ge3saCnipchl2hJEL/Yq4r2VoW2zPsXvTgBpBARA2IHkH0JG2I\nhQIqbr+7aQKBgQDgSRdZ64FiHstqjKBRMXj0A17lapDoinJPe43UnWuLh2iGNHTT\nYxqOrPpiO535aKB+T30hjxLiLTXBkvINZ+2U9FgNXZhpb1LgsNXtXYM/5jZ3WGlf\niS5t+1rLRpuUN5eKth6GsvZqu/JWMWnlT+i7bRebZ89v4//RMxmQFTjTKQKBgQCc\nvKnIL97ITS4vZeZnyJAOBGhVplyN2LQLxxOYuadtO8Px4JU20UN4h1sdm04pvTpl\nd6GYweB9R1FiX6uHO5aX6HVN4K8fYhhbpP5rxDIOIMXOxHx8EY3ShdajspBGLA2L\nFfg8CUcd8hBInAq2ONDYmAMzXCOe2BSBA1O3KYP0KQKBgQDs3SXk6nuhPOrNlIK6\nZNBFR8RnyHQyuWE50AqYMqaXAHv6tmGGls7hHyDDG6k2rsWWeFIXjL8TxMshAque\nQlGHy3+PytapEh3oecZtv9x3bYxnKxSnCDm/fyeXP+ggElWN9nhUCphrKJMXmpA1\nJS/FcrTaAbuVSnQhkUjaD2pc0w==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-dxpmc@rplaceclone.iam.gserviceaccount.com",
  "client_id": "111024216841780990750",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-dxpmc%40rplaceclone.iam.gserviceaccount.com"
}


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

server.listen(process.env.PORT || 5000, () => {
  console.log('listening on *:3000');
});