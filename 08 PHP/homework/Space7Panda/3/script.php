<?php
require_once("VendingMachine.php");

$items = [
    [ "name" => "Шоколад белый", "code" => "A01", "quantity" => 10, "price" => 0.60 ],
    [ "name" => "Шоколад молочный", "code" => "A02", "quantity" => 5, "price" => 0.60 ],
    [ "name" => "Пиво светлое", "code" => "A03", "quantity" => 1, "price" => 0.65 ],
    [ "name" => "Вода без газа", "code" => "A04", "quantity" => 1, "price" => 0.25 ]
];

$normalProduct = new DefaultProduct($items);
$dispenser = new VendingMachine($normalProduct);

$dispenser->vend('A01', 6);
$dispenser->vend('A02', 6);
$dispenser->vend('A03', 6);
$dispenser->showCash();
$dispenser->showItems();

require_once("products/Alcohol.php");

$alcoholItems = [
    [ "name" => "Водка", "code" => "A01", "quantity" => 3, "price" =>  1 ],
    [ "name" => "Вино", "code" => "A02", "quantity" => 7, "price" => 2.60 ],
    [ "name" => "Пиво светлое", "code" => "A03", "quantity" => 15, "price" => 1.65 ],
    [ "name" => "Самогон", "code" => "A04", "quantity" => 1, "price" => 2.25 ]
];

$alcohol = new Alcohol($alcoholItems);
$dispenserWithAlcohol = new VendingMachine($alcohol);

$dispenserWithAlcohol->vend('A01', 5);
$dispenserWithAlcohol->vend('A02', 10);
$dispenserWithAlcohol->vend('A03', 15);

require_once("products/ProductsWithExpDate.php");

$expDateItems = [
    [ "name" => "Колбаса", "code" => "A01", "quantity" => 1, "price" => 2.05, "expiration date" => "20.12.2018"],
    [ "name" => "Консервы", "code" => "A02", "quantity" => 10, "price" => 1.05, "expiration date" => "20.12.2025"],
    [ "name" => "Борщ", "code" => "A03", "quantity" => 1, "price" => 0.05, "expiration date" => "01.01.2007"],
];

$productsWithExpDate = new WithExpDate($expDateItems);
$dispenserWithExpDate = new VendingMachine($productsWithExpDate);

$dispenserWithExpDate->vend('A01', 5);
$dispenserWithExpDate->vend('A02', 10);
$dispenserWithExpDate->vend('A04', 15);