<?php

require_once '../config/init.php';

if (isset($_GET['id'], $_GET['done'])) {
    $id = $_GET['id'];
    $done = $_GET['done'];

    if ($done == 0) {
        $doneQuerry = $db->prepare("
            UPDATE items
              SET done = 1
              WHERE id = :id
        ");

        $doneQuerry->execute([
            'id' => $id
        ]);
    } else {
        $undoneQuerry = $db->prepare("
            UPDATE items
              SET done = 0
              WHERE id = :id
        ");

        $undoneQuerry->execute([
            'id' => $id,
        ]);
    }
}

header('Location: ../index.php');
