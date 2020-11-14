const { Socket } = require("dgram");
let app = require("express");
let http = require("http").Server(app);
let io = require("socket.io")(http);
let Players = 0;
let players;
let Groups = 0;
let connectionsLimit = 2;
io.on("connection", (socket) => {
    console.log("se conecto un vato");
    Players++;
  if(Players%2==0){
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