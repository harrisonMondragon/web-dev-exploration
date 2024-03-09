<?php
session_start();
    $_SESSION;

    include("connection.php");
    include("function.php");

    $user_data = check_login($con);    
    
?>

<!DOCTYPE html>
<html>
<head>
    <title>Harra Jrn A3</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>

<div class="container">
        <h1>Welcome to Harra and Jrn's SENG 513 Assignment 3</h1>
        <a href="login.php"><button>Login</button></a>
        <a href="signup.php"><button>Signup</button></a>
    </div>

</body>
</html>


