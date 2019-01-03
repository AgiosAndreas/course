<?php namespace app;

require_once "interfaces/VendingMachineInterface.php";

class VendingMachine implements VendingMachineInterface
{
    public $products;
    public $vendCash;

    public function __construct($products)
    {
        $this->products = $products;
        $this->vendCash = 0;
    }

    public function addCash($cash)
    {
        $this->vendCash += $cash;
    }

    public function vend($code, $cash)
    {
        $currentProduct = null;

        foreach ($this->products as $key => $item) {
            if ($this->products[$key]->getCode() == $code) {
                $currentProduct = $item;
                break;
            }
        }

        if ($currentProduct == null) {
            echo "Такого товара нет в автомате!\n";
            return;
        }

        $name = $currentProduct->getName();
        $quantity = $currentProduct->getQuantity();
        $price = $currentProduct->getPrice();

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
            $currentProduct->decreaseQuantity();

            echo "Возьмите $name\n";
            return;
        }

        if ($cash > $price) {
            $this->addCash($price);
            $currentProduct->decreaseQuantity();

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
        foreach ($this->products as $key => $value) {
            echo $this->products[$key]->getName()
                . " "
                . $this->products[$key]->getQuantity()
                . "шт.\n";
        }
    }
}
