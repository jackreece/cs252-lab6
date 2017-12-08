// Establish server connection, create a socket
var socket = io.connect("http://localhost:4000");

// Query DOM
var message = document.getElementById("message"),
    handle = document.getElementById("handle"),
    btn = document.getElementById("send"),
    output = document.getElementById("output");
    select = document.getElementById("select-color");

// Emit event
btn.addEventListener("click", function() {

  // Send a chat object over the socket
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
    color: select.options[select.selectedIndex].value
  });

  console.log(select.options[select.selectedIndex].value);

  // Scroll the chat window to the bottom every time a new chat message is sent
  var chatWindow = document.getElementById("chat-window");
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

// Listen for events
socket.on("chat", function(data) {
  if (data.handle != undefined && data.message != undefined && data.handle != "" && data.message != "") {
    output.innerHTML += "<p style='color:" + data.color + ";'><strong>" + data.handle + ":</strong> " + data.message + "</p>";
  }
});
