<?php

    session_start();
    include("connection.php");
    $message = "";

    if($_SERVER['REQUEST_METHOD'] == "POST"){
        $username = $_POST['username'];
        $password = $_POST['password'];
        $confirm_password = $_POST['confirm_password'];
        if(!empty($username) && !empty($password) && !empty($confirm_password) && !is_numeric($username)){
            if($password == $confirm_password){
                $query = "select * from users where username = '$username' limit 1";
                $result = mysqli_query($con, $query);
                if($result && mysqli_num_rows($result) > 0){
                    $message = "This username already exists. Please use a different one!";
                } else {
                    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                    $query = "INSERT INTO users (username, password) VALUES ('$username', '$hashed_password')";
                    mysqli_query($con, $query);
                    $message = "Signup successful! Please <a href='login.php'>login</a>!";
                }
            } else {
                $message = "Passwords do not match!";
            }
        }else{
            $message = "Please enter some valid information!";
        }
    }

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
            <h1>Signup</h1>
            <?php if (!empty($message)) : ?>
                <div class=popup>
                    <p><?php echo $message; ?></p>
                </div>
            <?php endif; ?>
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