<?php

require_once '../config/init.php';

if (isset($_POST['name'])) {
    $name = trim($_POST['name']);

    if (!empty($name)) {
        $addQuery = $db->prepare("
            INSERT INTO items (name, done, created)
            VALUES (:name, 0, NOW())
        ");

        $addQuery->execute([
            'name' => $name,
        ]);
    }
}

header('Location: ../index.php');
