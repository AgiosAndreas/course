<?php

interface VendingMachineInterface 
{
    public function vend($code, $cash);
}

interface DefaultProductInterface
{
    public function getName($code);
    public function getQuantity($code);
    public function getPrice($code);
    public function decreaseQuantity($code);
}

class DefaultProduct implements DefaultProductInterface 
{
    public $items;

    public function __construct($items) {
        $this->items = $this->sortArr($items);
    }

    public function sortArr($arr) 
    {
        $sortedArr = array();

        foreach ($arr as $key => $value) {
            $sortedArr[$value["code"]] = $value; 
        }

        return $sortedArr;
    }

    public function getName($code) 
    {
        return $this->items[$code]["name"];
    }

    public function getQuantity($code) 
    {
        return $this->items[$code]["quantity"];
    }

    public function getPrice($code) 
    {
        return $this->items[$code]["price"];
    }

    public function decreaseQuantity($code)
    {
        $this->items[$code]["quantity"] -= 1;
    }
    
    public function getItems()
    {
        return $this->items;
    }
}

class VendingMachine implements VendingMachineInterface
{
    public $product;
    public $vendCash; 

    public function __construct($product) {
        $this->product = $product;
        $this->vendCash = 0;
    }

    public function addCash($cash)
    {
        $this->vendCash += $cash;
    }

    public function vend($code, $cash) 
    {

        $name = $this->product->getName($code);
        $quantity = $this->product->getQuantity($code);
        $price = $this->product->getPrice($code);

        if ($quantity <= 0) {

            echo "$name закончился!\n";

            return;
        }

        if ($cash < $price) {

            echo 'Недостаточно денег!' . "\n";
        
            return;
        }

        if ($cash == $price) {
            $this->addCash($cash);
            $this->product->decreaseQuantity($code);

            echo "Возьмите $name\n";
            return;
        }

        if ($cash > $price) {
            $this->addCash($price);
            $this->product->decreaseQuantity($code);

            $change = $cash - $price;

            echo "Возьмите $name. Ваша сдача - $change\n";
            return;
        }

    }

    public function showCash()
    {
        echo "В торгомате " . $this->vendCash . " валюты.\n";
    }

    public function showItems()
    {
        $items = $this->product->getItems();

        foreach ($items as $key=>$value) {

            echo $items[$key]['name']
                . " "
                . $items[$key]['quantity']
                . "шт.\n";
        }
    }
}

$items = [
    [ "name" => "Шоколад белый", "code" => "A01", "quantity" => 10, "price" => 0.60 ],
    [ "name" => "Шоколад молочный", "code" => "A02", "quantity" => 5, "price" => 0.60 ],
    [ "name" => "Пиво светлое", "code" => "A03", "quantity" => 1, "price" => 0.65 ],
    [ "name" => "Вода без газа", "code" => "A04", "quantity" => 1, "price" => 0.25 ],
    [ "name" => "Колбаса", "code" => "A05", "quantity" => 1, "price" => 2.05, "expiration date" => "20.12.2018"],
    [ "name" => "Консервы", "code" => "A06", "quantity" => 10, "price" => 1.05, "expiration date" => "20.12.2025"]
];

$normalProduct = new DefaultProduct($items);
$dispenser = new VendingMachine($normalProduct);

$dispenser->vend('A01', 6);
$dispenser->vend('A06', 6);
$dispenser->vend('A05', 6);
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