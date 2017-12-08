var express = require("express");
var socket = require("socket.io");

var app = express();
var server = app.listen(4000, function() {
  console.log("hello!!! listening to requests on port 4000");
});

// Serve static files (e.g. HTML pages)
// Set default page to login.html, not index.html
// https://stackoverflow.com/questions/33818217/node-js-how-to-make-default-page-to-be-sth-other-than-index-html
app.use(express.static("public", {index: "login.html"}));

// Socket setup
var io = socket(server);

io.on("connection", function(socket) {

  // Confirm connection
  console.log("made socket connection", socket.id);

  // Handle signal from socket
  socket.on("chat", function(data) {
    io.sockets.emit("chat", data);
  });

});
