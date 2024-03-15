<?php

    session_start();
    include("connection.php");

    function check_user($con) {
        if(isset($_SESSION['id'])){
            $id = $_SESSION['id'];
            $query = "select * from users where id = '$id' limit 1";
            $result = mysqli_query($con, $query);
            if($result && mysqli_num_rows($result) > 0) {
                $user_data = mysqli_fetch_assoc($result);
                if($user_data['username'] == "admin"){
                    header("Location: admin.php");
                    die;
                } else {
                    header("Location: home.php");
                    die;
                }
            }
        }
    }

    check_user($con);

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


