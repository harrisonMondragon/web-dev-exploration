<?php

    session_start();
    include("connection.php");
    $message = "";

    if($_SERVER['REQUEST_METHOD'] == "POST"){
        $username = $_POST['username'];
        $password = $_POST['password'];
        if(!empty($username) && !empty($password) && !is_numeric($username)){
            // Check for regular users
            $query = "select * from users where username = '$username' limit 1";
            $result = mysqli_query($con, $query);
            if($result){
                if($result && mysqli_num_rows($result) > 0){
                    $user_data = mysqli_fetch_assoc($result);
                    if(password_verify($password, $user_data['password'])){
                        $_SESSION['id'] = $user_data['id'];
                        header("Location: home.php");
                        die;
                    }
                }
            }
            // Check for admins
            $aQuery = "select * from admins where username = '$username' limit 1";
            $aResult = mysqli_query($con, $aQuery);
            if($aResult){
                if($aResult && mysqli_num_rows($aResult) > 0){
                    $admin_data = mysqli_fetch_assoc($aResult);
                    if($password === $admin_data['password']){
                        $_SESSION['id'] = $admin_data['id'];
                        header("Location: admin.php");
                        die;
                    }
                }
            }

            $message = "Please enter some valid information!";
        }else{
            $message = "Please fill in all fields";
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
            <h1>Login</h1>
            <?php if (!empty($message)) : ?>
                <div class=popup>
                    <p><?php echo $message; ?></p>
                </div>
            <?php endif; ?>
            <form method="post">
                <label for="username">Username:</label><br>
                <input type="text" id="username" name="username" required><br>
                <label for="password">Password:</label><br>
                <input type="password" id="password" name="password" required><br><br>
                <button type="submit" name="login">Login</button>
                <a href="signup.php">Don't have an account? Sign up!</a>
            </form>
        </div>
    </body>
</html>