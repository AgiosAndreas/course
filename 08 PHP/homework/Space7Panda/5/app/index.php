<?php

require_once 'config/smartyHeader.php';
require_once 'config/init.php';

/* sql */

$itemsQuerry = $db->prepare("
    SELECT id, name, done
    FROM items
");

$itemsQuerry->execute();

$items = $itemsQuerry->rowCount() ? $itemsQuerry : [];

/* smarty */

$smarty->assign('items', $items);
$smarty->display('index.tpl');
