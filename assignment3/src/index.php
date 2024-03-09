<?php
    include("connection.php");
?>

<!DOCTYPE html>
<html>
<head>
    <title>Harra Jrn A3</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>

<?php
// Check if login or signup button is clicked
if (isset($_POST['action'])) {
    $action = $_POST['action'];
    if ($action === 'login') {
        // Show login form
        echo '
        <div class="container">
            <h1>Login</h1>
            <form method="post">
                <label for="username">Username:</label><br>
                <input type="text" id="username" name="username" required><br>
                <label for="password">Password:</label><br>
                <input type="password" id="password" name="password" required><br><br>
                <button type="submit" name="login">Login</button>
            </form>
        </div>';
    } elseif ($action === 'signup') {
        // Show signup form
        echo '
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
            </form>
        </div>';
    }
} else {
    // Default: show landing page
    echo '
    <div class="container">
        <h1>Welcome to Harra and Jrn\'s SENG 513 Assignment 3</h1>
        <form method="post">
            <button type="submit" name="action" value="login">Login</button>
            <button type="submit" name="action" value="signup">Signup</button>
        </form>
    </div>';
}
?>

</body>
</html>
