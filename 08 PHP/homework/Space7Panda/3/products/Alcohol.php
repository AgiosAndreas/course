<?php

require_once("./VendingMachine.php");

class Alcohol extends DefaultProduct implements DefaultProductInterface
{
    public function getQuantity($code) 
    {
        $time = date('H:i');
        $timeLimit = "18:00";

        if ($time > $timeLimit) {
            return 0;
        }

        return $this->items[$code]["quantity"];
    }
}