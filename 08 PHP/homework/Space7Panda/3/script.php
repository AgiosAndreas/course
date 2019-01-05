<?php

require_once __DIR__ . "/vendor/autoload.php";

use App\Core\ProductBase;
use App\Core\VendingMachine;
use App\Products\Alcohol;
use App\Products\WithExpDate;

$items = [
    ["name" => "Шоколад белый", "code" => "A01", "quantity" => 10, "price" => 0.60],
    ["name" => "Шоколад молочный", "code" => "A02", "quantity" => 5, "price" => 0.60],
    ["name" => "Пиво светлое", "code" => "A03", "quantity" => 1, "price" => 0.65],
    ["name" => "Вода без газа", "code" => "A04", "quantity" => 1, "price" => 0.25]
];

foreach ($items as $key => $item) {
    $products[$key] = new ProductBase($item);
}

$dispenser = new VendingMachine($products);

$dispenser->vend('A01', 6);
$dispenser->vend('A02', 0.1);
$dispenser->vend('A012', 6);
$dispenser->showCash();
$dispenser->showItems();


$alcoholItems = [
    ["name" => "Водка", "code" => "A01", "quantity" => 3, "price" => 1],
    ["name" => "Вино", "code" => "A02", "quantity" => 7, "price" => 2.60],
    ["name" => "Пиво светлое", "code" => "A03", "quantity" => 15, "price" => 1.65],
    ["name" => "Самогон", "code" => "A04", "quantity" => 1, "price" => 2.25]
];

foreach ($alcoholItems as $key => $alcItem) {
    $alcohol[$key] = new Alcohol($alcItem);
}

$dispenserWithAlcohol = new VendingMachine($alcohol);

$dispenserWithAlcohol->vend('A01', 5);
$dispenserWithAlcohol->vend('A02', 10);
$dispenserWithAlcohol->vend('A05', 15);


$expDateItems = [
    ["name" => "Колбаса", "code" => "A01", "quantity" => 1, "price" => 2.05, "expiration date" => "20.12.2018"],
    ["name" => "Консервы", "code" => "A02", "quantity" => 10, "price" => 1.05, "expiration date" => "20.12.2025"],
    ["name" => "Борщ", "code" => "A03", "quantity" => 1, "price" => 0.05, "expiration date" => "01.01.2007"],
];

foreach ($expDateItems as $key => $expDateItem) {
    $productsWithExpDate[$key] = new WithExpDate($expDateItem);
}

$dispenserWithExpDate = new VendingMachine($productsWithExpDate);

$dispenserWithExpDate->vend('A01', 5);
$dispenserWithExpDate->vend('A02', 10);
$dispenserWithExpDate->vend('A04', 15);
