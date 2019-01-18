<?php

require_once '../config/db_config.php';

if (isset($_POST['name'])) {
    $name = trim($_POST['name']);

    if (!empty($name)) {
        $addQuery = $db->prepare("
            INSERT INTO items (name, done)
              VALUES (:name, 0)
        ");

        $addQuery->execute([
            'name' => $name,
        ]);
    }
}

header('Location: ../index.php');
