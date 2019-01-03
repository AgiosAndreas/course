<?php namespace product;

require_once "ProductBase.php";

class Alcohol extends ProductBase
{
    public function getQuantity()
    {
        $time = date('H:i');
        $timeLimit = "18:00";

        if ($time > $timeLimit) {
            return 0;
        }

        return $this->data["quantity"];
    }
}
