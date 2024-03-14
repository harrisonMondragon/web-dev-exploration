<?php
    session_start();
    include("connection.php");

    if ($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST['deleteUser'])) {
        $deleteId = $_POST['deleteId'];
        $query = "DELETE FROM users WHERE id = '$deleteId'";
        if (mysqli_query($con, $query)) {
            echo "User deleted successfully!";
        } else {
            echo "Error deleting user!";
        }
    }

    function check_admin_authenticated($con) {
        if(isset($_SESSION['id'])){
            $id = $_SESSION['id'];
            $query = "select * from admins where id = '$id' limit 1";
            $result = mysqli_query($con, $query);
            if($result && mysqli_num_rows($result) > 0){
                return;
                // $user_data = mysqli_fetch_assoc($result);
                // if($user_data['username'] == "admin"){
                //     return;
                // }
            }
        }
        header("Location: login.php");
        die;
    }

    check_admin_authenticated($con);

?>

<!DOCTYPE html>
<html>
    <head>
        <title>Admin Page</title>
        <link rel="stylesheet" type="text/css" href="styles.css">
    </head>
    <body>
        <div class="container">
            <h1>Welcome to the Admin Panel</h1>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        $query = "SELECT * FROM users";
                        $result = mysqli_query($con, $query);
                        if (!$result) {
                            echo "Error retrieving users!";
                        } else {
                            if ($result && mysqli_num_rows($result) > 0) {
                                while($row = mysqli_fetch_assoc($result)) {
                                    echo "<tr>";
                                    echo "<td>" . $row["id"] . "</td>";
                                    echo "<td>" . $row["username"] . "</td>";
                                    echo "<td>" . $row["password"] . "</td>";
                                    if ($row['username'] != "admin") {
                                        echo "<td><form method='post'><input type='hidden' name='deleteId' value='" . $row['id'] . "'><button type='submit' name='deleteUser'>Delete User</button></form></td>";
                                    }
                                    echo "</tr>";
                                }
                            } else {
                                echo "<tr><td colspan='3'>No Users Found</td></tr>";
                            }
                        }
                    ?>
                </tbody>
            </table>
            <a href="logout.php"><button>Logout</button></a>
        </div>
    </body>
</html>
