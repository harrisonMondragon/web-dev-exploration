<?php

    $dbhost = getenv('DB_HOST');
    $dbuser = getenv('DB_USER');
    $dbpass = getenv('DB_PASS');
    $dbname = getenv('DB_NAME');

    if (!$dbhost || !$dbuser || !$dbpass || !$dbname) {
        die("One or more of the required environment variables are missing!");
    }

    if(!$con = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname)){
        die("Failed to connect to database!");
    }