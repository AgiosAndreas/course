<?php

require_once '../config/db_config.php';

if (isset($_GET['item'])) {
    $item = $_GET['item'];

    $deleteQuerry = $db->prepare("
        DELETE FROM items 
          WHERE id = :item
    ");

    $deleteQuerry->execute([
        'item' => $item,
    ]);
}

header('Location: ../index.php');
