<?php

require_once '../config/init.php';

$item = $_GET['item'];

$deleteQuerry = $db->prepare("
DELETE FROM items 
WHERE id = :item
");

$deleteQuerry->execute([
'item' => $item,
]);

header('Location: ../index.php');