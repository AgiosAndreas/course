<?php

require_once 'vendor/autoload.php';

$smarty = new Smarty;

$smarty->caching = false;
$smarty->template_dir = './templates';
$smarty->compile_dir = './templates_c';
