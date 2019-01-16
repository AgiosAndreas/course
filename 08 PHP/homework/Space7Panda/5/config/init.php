<?php
$db_name = 'to_do_list';
$db_host = 'localhost';
$db_user = 'root';
$db_pass = 'root';

$db = new PDO("mysql:dbname=$db_name;host=$db_host", $db_user, $db_pass);
