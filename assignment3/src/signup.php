<?php

    session_start();
    include("connection.php");

    if($_SERVER['REQUEST_METHOD'] == "POST"){
        $username = $_POST['username'];
        $password = $_POST['password'];
        if(!empty($username) && !empty($password) && !is_numeric($username)){
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $query = "insert into users (username, password) values ('$username', '$hashed_password')";
            mysqli_query($con, $query);
            header("Location: login.php");
            die;
        }else{
            echo "Please enter some valid information!";
        }
    }   
    
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Harra Jrn A3</title>
        <link rel="stylesheet" type="text/css" href="styles.css">
    </head>
    <body>
        <div class="container">
            <h1>Signup</h1>
            <form method="post">
                <label for="username">Username:</label><br>
                <input type="text" id="username" name="username" required><br>
                <label for="password">Password:</label><br>
                <input type="password" id="password" name="password" required><br>
                <label for="confirm_password">Confirm Password:</label><br>
                <input type="password" id="confirm_password" name="confirm_password" required><br><br>
                <button type="submit" name="signup">Signup</button>
                <a href="login.php">Already have an account? Login!</a>
            </form>
        </div>
    </body>
</html>