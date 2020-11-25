var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.lastPlayderID = 0;

server.listen(process.env.PORT || 8081, function () {
  console.log('Listening on ' + server.address().port);
});

var numPlayers = 0;
var queue = [];
var inRoom = 0;

io.on('connection', function (socket) {
  socket.on('newplayer', function () {
    if (inRoom < 2) {
      if (inRoom == 0 && numPlayers == 0) {
        inRoom = 1;
        socket.player = {
          id: server.lastPlayderID++,
          type: 1,
          x: 50,
          y: 50
        };
      } else if (inRoom == 1 && numPlayers == 1) {
        inRoom = 2;
        socket.player = {
          id: server.lastPlayderID++,
          type: 2,
          x: 50,
          y: 50
        };
      }

      socket.emit('allplayers', getAllPlayers());
      socket.broadcast.emit('newplayer', socket.player);

      // socket.on('move', function (data) {
      //   console.log('click to ' + data.x + ', ' + data.y);
      //   socket.player.x = data.x;
      //   socket.player.y = data.y;
      //   io.emit('move', socket.player);
      // });

      socket.on('disconnect', function () {
        socket.broadcast.emit('remove');
        console.log("se salio alguien");
        // numPlayers--;
        // inRoom--;
      });

    } else {
      queue.push(socket.id);
    }
    numPlayers++;


    //     socket.on('click', function (data) {
    //       console.log('click to ' + data.x + ', ' + data.y);
    //       socket.player.x = data.x;
    //       socket.player.y = data.y;
    //       io.emit('move', socket.player);
    //     });
    //   } else {
    //     //Lo añado a una cola
    //     queue.push(numPlayers);
    //   }
    //   socket.on('disconnect', function () {
    //     io.emit('remove', socket.player.id);
    //     numPlayers--;
    //     inRoom--;
    //   });
  });
});

function getAllPlayers() {
  var players = [];
  Object.keys(io.sockets.connected).forEach(function (socketID) {
    var player = io.sockets.connected[socketID].player;
    if (player) players.push(player);
  });
  return players;
}





/*
const path = require('path');
//const jsdom = require('jsdom');
const { Socket } = require("dgram");
let app = require("express");
let http = require("http").Server(app);
let io = require("socket.io")(http);
//const { JSDOM } = jsdom;
let Players = 0;
let players;
let Groups = 0;
let connectionsLimit = 2;
io.on("connection", (socket) => {
  console.log("se conecto un vato");
  Players++;
  if (Players % 2 == 0) {
    io.sockets.emit("par")
    Groups++;
  }
  socket.on('disconnect', (reason) => {
    console.log("se desconecto un vato");
    Players--;
  });
  if (io.engine.clientsCount > connectionsLimit) {
    socket.emit('Sorry', { message: 'reach the limit of connections' })
    socket.disconnect()
    console.log('Disconnected...')
    return
  }
});


var port = 2525;

http.listen(port, function () {
  console.log("listening in " + port)
});


// function setupAuthoritativePhaser() {
//   JSDOM.fromFile(path.join(__dirname, '../Cliente/index.html'), {
//     // To run the scripts in the html file
//     runScripts: "dangerously",
//     // Also load supported external resources
//     resources: "usable",
//     // So requestAnimatinFrame events fire
//     pretendToBeVisual: true
//   });
// }

//setupAuthoritativePhaser();
// Test para comprobar que la conexion VSC a git es exitosa*/