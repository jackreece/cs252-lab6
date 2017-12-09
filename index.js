var express = require("express");
var socket = require("socket.io");

var app = express();
var server = app.listen(4000, function() {
  console.log("hello!!! listening to requests on port 4000");
});

// Serve static files (e.g. HTML pages)
// app.use(express.static("public"));

// Set default page to login.html, not index.html
// https://stackoverflow.com/questions/33818217/node-js-how-to-make-default-page-to-be-sth-other-than-index-html
app.use(express.static("public")); // , {index: "login.html"}));

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

// Setup database
var mysql = require("mysql");
var connection = mysql.createConnection({
  host:     "localhost",
  user:     "messenger",
  password: "messenger1234",
  database: "cs252"
});

// Handle database
app.get('/database', function(req, res) {

  // Debug
  console.log(req.url);
  console.log(req.query.a);

  var mode = req.query.mode;
  if (mode === "save") {

    // Open database connection
    connection.connect();

    // Query database
    var queryStr = "SELECT username FROM users WHERE username = '" + req.query.handle + "';";
    var usernameExists = false;
    connection.query(queryStr, function(err, rows, fields) {
      if (err) throw err;
      usernameExists = rows.length !== 0;
    });
    if (usernameExists) {
      var updateRow = false;
      queryStr = "SELECT username FROM users WHERE username = '" + req.query.handle + "' AND password = '" + req.query.password + "';";
      connection.query(queryStr, function(err, rows, fields) {
        if (err) throw err;

        if (rows.length == 0) {
          // Wrong password -- we know the username but not the password
          res.send("Error: wrong password.")
        }
        else {
          // Update row
          updateRow = true;
        }
      });
      if (updateRow) {
        queryStr = "UPDATE users SET color = '" + req.query.color + "', profile_image = '" + req.query.icon + "' WHERE username = '" + req.query.handle + "';";
        connection.query(queryStr, function(err, row, fields) {
          if (err) throw err;
        });
        res.send("Profile saved.");
      }
    }
    else {
      // Insert a new user profile into the database
      queryStr = "INSERT INTO users (username, password, color, profile_image) VALUES ('" + req.query.handle + "', '" + req.query.password + "', '" + req.query.color + "', '" + req.query.icon + "');";
      connection.query(queryStr, function(err, rows, fields) {
        if (err) throw err;
      });

      // Send confirmation response via HTTP
      res.send("Profile created.");
    }

    // Close database connection
    connection.end();

  }
  else if (mode === "load") {
  }

  // Close HTTP connection
  res.end();

});
