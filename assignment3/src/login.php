<?php
session_start();

    include("connection.php");
    include("function.php");

    if($_SERVER['REQUEST_METHOD'] == "POST"){
        //something was posted
        $username = $_POST['username'];
        $password = $_POST['password'];

        if(!empty($username) && !empty($password) && !is_numeric($username)){

            //read from database
            $query = "select * from users where username = '$username' limit 1";

            $result = mysqli_query($con, $query);

            if($result){
                if($result && mysqli_num_rows($result) > 0){
                    $user_data = mysqli_fetch_assoc($result);
                    if($user_data['password'] === $password){
                        $_SESSION['id'] = $user_data['id'];
                        header("Location: home.php");
                        die;
                    }
                }
            }
            echo "Please enter some valid information!";
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
    <h1>Login</h1>
    <form method="post">
        <label for="username">Username:</label><br>
        <input type="text" id="username" name="username" required><br>
        <label for="password">Password:</label><br>
        <input type="password" id="password" name="password" required><br><br>
        <button type="submit" name="login">Login</button>
    </form>
</div>

</body>
</html>