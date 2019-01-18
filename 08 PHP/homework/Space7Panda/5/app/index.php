<?php

require_once 'config/smartyHeader.php';
require_once 'config/init.php';

if (isset($_GET['sort'])) {
    $sort = $_GET['sort'];

    switch ($sort) {
        case "active":
            $itemsQuerry = $db->prepare("
                SELECT id, name, done
                  FROM items
                  WHERE done = 0;
            ");

            break;
        case "compleated":
            $itemsQuerry = $db->prepare("
                SELECT id, name, done
                  FROM items
                  WHERE done = 1;
            ");

            break;
    }
} else {
    $itemsQuerry = $db->prepare("
        SELECT id, name, done
          FROM items
    ");
}

$itemsQuerry->execute();

$items = $itemsQuerry->rowCount() ? $itemsQuerry : [];

$smarty->assign('items', $items);
$smarty->display('index.tpl');
