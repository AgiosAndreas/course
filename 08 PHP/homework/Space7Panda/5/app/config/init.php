<?php
$db_name = 'ex_08_05';
$db_host = 'localhost';
$db_user = 'user';
$db_pass = 'User@mopohi91';

$table = 'items';

try {
    $db = new PDO("mysql:dbname=$db_name;host=$db_host", $db_user, $db_pass);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql ="
        CREATE TABLE IF NOT EXISTS $table(
            ID INT(11) AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(40),
            done TINYINT(4)
        );";

    $db->exec($sql);
} catch (PDOException $e) {
    echo $e->getMessage();
}
