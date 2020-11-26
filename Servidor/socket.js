
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
    numPlayers++;
    if (inRoom < 2) {
      if (inRoom == 0 && numPlayers == 1) {
        inRoom = 1;
        socket.player = {
          id: server.lastPlayderID++,
          type: 1
        };
      } else if (inRoom == 1 && numPlayers == 2) {
        inRoom = 2;
        socket.player = {
          id: server.lastPlayderID++,
          type: 2,
        };
      } else if (inRoom == 0 && numPlayers == 2) {
        inRoom = 2;
        socket.player = {
          id: server.lastPlayderID++,
          type: 1
        };
      }


      socket.emit('allplayers', getAllPlayers());
      socket.broadcast.emit('newplayer', socket.player);

      socket.on('move', function (data) {
        socket.player = {
          x: data.x,
          y: data.y
        };
        socket.broadcast.emit('moving', socket.player);
      });

      socket.on('idle',()=>{
        socket.broadcast.emit('idling');
      });

      socket.on('disconnect', function () {
        socket.broadcast.emit('remove');
        console.log("se salio un vato");
        numPlayers--;
        let sw = true;
        queue.forEach(id => {
          if (socket.id == id) {
            sw = false;
          }
        });
        if (sw) {
          console.log("se desconecto un vato tipo " + socket.player.type);
          if (socket.player.type == 2) {
            inRoom = 1;
          } else if (socket.player.type == 1) {
            inRoom = 0;
          }

        }
      });

    } else {
      queue.push(socket.id);
    }





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

