<?php

$dbhost = "db";
$dbuser = "user";
$dbpass = "password";
$dbname = "my_db";

if(!$con = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname)){
    die("failed to connect!");
}