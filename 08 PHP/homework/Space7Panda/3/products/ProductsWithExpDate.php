<?php
require_once("./VendingMachine.php");

class WithExpDate extends DefaultProduct implements ProductInterface
{
    public function getQuantity($code) 
    {
        if ($this->items[$code]['expiration date']) {

            $todayDate = date('d.m.Y');
            $itemDate = $this->items[$code]['expiration date'];

            if (strtotime($todayDate) > strtotime($itemDate)) {
            
                return 0;
            }

        }

        return $this->items[$code]["quantity"];
    }
}