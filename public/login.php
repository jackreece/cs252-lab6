<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    
    <title>Messenger - Login</title>
    <link href="styles.css" rel="stylesheet"/>

    <!-- Link login.php script -->
    <?php include '../login.php' ?>

  </head>
  <body>
    <h1 align="center" color="#ff0000" background-color="#00ff00">Messenger - Login</h1>
    <div id="login-form" align="center">
      <form action="index.html">
        <input id="username" type="text" placeholder="Username"/><br/>
        <input id="password" type="password" placeholder="Password"/><br/>
        <button id="login">Login</button>
      </form>
    </div>
  </body>
</html>
