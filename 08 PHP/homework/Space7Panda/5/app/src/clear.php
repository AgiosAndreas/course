<?php

require_once '../config/db_config.php';

if (isset($_GET['clear'])) {
    if ($_GET['clear'] == 'compleated') {
        $deleteQuerry = $db->prepare("
            DELETE FROM items 
              WHERE done = 1
        ");

        $deleteQuerry->execute();
    }
}

header('Location: ../index.php');
