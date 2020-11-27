//Condiciones iniciales
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//Definción de parametros
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));

app.use(express.static(__dirname + '/Cliente'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

server.lastPlayderID = 0;

//Puerto
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8082;
}
server.listen(port, function () {
  console.log(`Listening on ${server.address().port}`);
});

//Variables
var numPlayers = 0;
var queue = [];
var inRoom = 0;

//Conexión de jugador
io.on('connection', (socket) => {
  socket.on('newplayer', () => {
    numPlayers++;
    queue.push(socket);
    if (inRoom < 2) {
      let first = queue.shift();
      Client(first);
    }
  });
});

//Crea el avatar
function Client(socket) {
  //Asigna tipo
  if (inRoom == 0 && numPlayers == 1) {
    inRoom = 1;
    socket.player = {
      type: 1
    };
  } else if (inRoom == 1 && numPlayers == 2) {
    inRoom = 2;
    socket.player = {
      type: 2,
    };
  } else if (inRoom == 0 && numPlayers == 2) {
    inRoom = 2;
    socket.player = {
      type: 1
    };
  }

  //Muestra los jugadores que ya estan en la partida y agrega a tu personaje a la partida de los demas
  socket.emit('allplayers', getAllPlayers());
  socket.broadcast.emit('newplayer', socket.player);

  //Para movimiento
  socket.on('move', function (data) {
    socket.player = {
      type: data.type,
      x: data.x,
      y: data.y
    };
    socket.broadcast.emit('moving', socket.player);
  });

  //Para Lag
  socket.on('compensator', function (data) {
    socket.broadcast.emit('compensation', data);
  });

  //Cuando esta quieto
  socket.on('idle', () => {
    socket.broadcast.emit('idling');
  });

  //Disparo
  socket.on('shoot', () => {
    socket.broadcast.emit('shooting', socket.player)
  });

  //Se desconecta
  socket.on('disconnect', function () {    
    numPlayers--;

    let sw = true;
    queue.forEach(id => {
      if (socket.id == id) {
        sw = false;
      }
    });

    if (sw) {
      socket.broadcast.emit('remove');
      if (socket.player.type == 2) {
        inRoom = 1;
        if (queue.length > 0) {
          Client(queue.shift());
        }
      } else if (socket.player.type == 1) {
        inRoom = 0;
        if (queue.length > 0) {
          Client(queue.shift());
        }
      }
    } else {
      queue.splice(queue.indexOf(socket), 1);
    }
  });

}


function getAllPlayers() {
  var players = [];
  Object.keys(io.sockets.connected).forEach(function (socketID) {
    var player = io.sockets.connected[socketID].player;
    if (player) players.push(player);
  });
  return players;
}

