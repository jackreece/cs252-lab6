// Establish server connection, create a socket
var socket = io.connect("http://localhost:4000");

// Query DOM
var message = document.getElementById("message"),
    handle = document.getElementById("handle"),
    btn = document.getElementById("send"),
    output = document.getElementById("output"),
    colors = document.getElementById("select-color"),
    icons = document.getElementById("select-icon");

// Emit event
btn.addEventListener("click", function() {

  // Send a chat object over the socket
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
    color: colors.options[colors.selectedIndex].value,
    icon: icons.options[icons.selectedIndex].value
  });

  // Scroll the chat window to the bottom every time a new chat message is sent
  var chatWindow = document.getElementById("chat-window");
  chatWindow.scrollTop = chatWindow.scrollHeight;

});

// Listen for "chat" event
socket.on("chat", function(data) {
  if (data.handle != undefined && data.message != undefined && data.handle != "" && data.message != "") {
    if (data.icon !== "") {
      output.innerHTML += "<img class='icon' src='icons/" + data.icon + "'/>";
    }
    output.innerHTML += "<p style='color:" + data.color + ";'><strong>" + data.handle + ":</strong> " + data.message + "</p>";
  }
});

//// User profile management ////

// Get DOM elements
var saveButton = document.getElementById("save-button");
var loadButton = document.getElementById("load-button");

var color = colors.options[colors.selectedIndex].value;
var icon = icons.options[icons.selectedIndex].value;

// Debug
console.log(color);
console.log(icon);

var password = document.getElementById("password");

// Create button event listeners
saveButton.addEventListener("click", function() {

  // Get the values of DOM elements at the time that the button is clicked
  var handle = document.getElementById("handle");
  var password = document.getElementById("password");
  var colors = document.getElementById("select-color");
  var icons = document.getElementById("select-icon");

  var color = colors.options[colors.selectedIndex].value;
  var icon = icons.options[icons.selectedIndex].value;

  // AJAX to send data to the server
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      var status = document.getElementById("status-message");

      // The server returns either an error message or a message confirming that the profile was saved
      status.innerHTML = this.responseText;
      if (this.responseText.substring(0, 5) === "Error") {
        status.style.color = "red";
      }
      else {
        status.style.color = "white";
      }

    }
  }

  // Construct query string
  var queryString = "/database?mode=save&handle=" + handle.value + "&password=" + password.value + "&color=" + color + "&icon=" + icon;

  // Open the request and send
  xhttp.open("GET", queryString, true);
  xhttp.send();

});

// // Open database connection
// var mysql = require("mysql");
//
// var conn = mysql.createConnection({
//   host: "localhost",
//   user: "messenger",
//   passsword: "messenger1234",
//   database: "cs252"
// });
//
// conn.connect(function(err) {
//   if (err) throw err;
//   console.log("MySQL: Connected!");
// });
