<?php

    session_start();
    include("connection.php");

    function check_authenticated($con) {
        if(isset($_SESSION['id'])){
            $id = $_SESSION['id'];
            $query = "select * from users where id = '$id' limit 1";
            $result = mysqli_query($con, $query);
            if($result && mysqli_num_rows($result) > 0){
                $user_data = mysqli_fetch_assoc($result);
                return $user_data;
            }
        }
        header("Location: login.php");
        die;
    }

    $user_data = check_authenticated($con);

?>

<!DOCTYPE html>
<html>
    <head>
        <title>Harra Jrn A3</title>
        <link rel="stylesheet" type="text/css" href="styles.css">
    </head>
    <body>
        <div class="container">
            <h1>Welcome to the application <?php echo $user_data['username']; ?>!</h1>
            <a href="logout.php"><button>Logout</button></a>
        </div>
    </body>
</html>
