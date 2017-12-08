<?php

if ($_POST["loginError"]) {
  header("./public/login.html");
  die();
}

// MySQL setup
$servername = "localhost";
$username = "messenger";
$password = "messenger1234";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
  die("MySQL connection failed: " . $conn->connect_error);
}
echo "MySQL: Connected successfully!";

// Query the database with user's info
$username = $_POST["username"];
$password = $_POST["password"];

if ($username === "" || $password === "") {
  header("./public/login.html");
}

$queryString = "SELECT username FROM users WHERE username='" . $username . "';"

$result = $conn->query($queryString);

// If a new username is entered, create a new user
if ($result->num_rows == 0) {
  $queryString = "INSERT INTO users (username, password, color, display_name) VALUES ('" . $username . "', '" . $password . "', 'red', '" . $username . "');";
}
else {
  $loginError = 1;
  $loginErrorMessage = "Username not available. Pick a different one.";
}

 ?>
