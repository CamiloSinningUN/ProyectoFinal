const { Socket } = require("dgram");
let app = require("express");
let http = require("http").Server(app);
let io = require("socket.io")(http);

io.on("connection", (socket) => {
    console.log("nueva conexión");
    socket.on("shoot",()=>{
        socket.broadcast.emit("shooting");
    });
});
var port = 2525;

http.listen(port, function () {
    console.log("listening in " + port)
});