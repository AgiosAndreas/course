<?php

require_once("./VendingMachine.php");

class Alcohol implements DefaultProductInterface
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
        $time = date('H:i');
        $timeLimit = "18:00";

        if ($time > $timeLimit) {
            return 0;
        }

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
}