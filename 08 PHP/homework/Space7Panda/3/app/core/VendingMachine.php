<?php namespace App\Core;

class VendingMachine
{
    private $products;
    private $vendCash;

    public function __construct($products)
    {
        if (!is_array($products)) {
            throw new \Exception("Product data is not an array");
        }

        $this->products = $products;
        $this->vendCash = 0;
    }

    private function addCash($cash)
    {
        $this->vendCash += $cash;
    }

    private function searchProduct($code)
    {
        $product = null;

        foreach ($this->products as $key => $item) {
            if ($this->products[$key]->getCode() == $code) {
                $product = $item;
                break;
            }
        }

        return $product;
    }

    public function vend($code, $cash)
    {
        $currentProduct = $this->searchProduct($code);

        if ($currentProduct == null) {
            return "Такого товара нет в автомате!";
        }

        $name = $currentProduct->getName();
        $quantity = $currentProduct->getQuantity();
        $price = $currentProduct->getPrice();

        if ($quantity <= 0) {
            return "$name закончился!";
        }

        if ($cash < $price) {
            return "Недостаточно денег!";
        }

        if ($cash == $price) {
            $this->addCash($cash);
            $currentProduct->decreaseQuantity();

            return "Возьмите $name";
        }

        if ($cash > $price) {
            $this->addCash($price);
            $currentProduct->decreaseQuantity();

            $change = $cash - $price;

            return "Возьмите $name. Ваша сдача - $change";
        }
    }

    public function showCash()
    {
        return "В торгомате " . $this->vendCash . " валюты.";
    }

    public function showItems()
    {
        foreach ($this->products as $key => $value) {
            echo $this->products[$key]->getName()
                . " "
                . $this->products[$key]->getQuantity()
                . "шт.\n";
        }
    }
}
