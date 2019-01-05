<?php

require_once "./ProductBase.php";

class WithExpDate extends ProductBase
{
    public function getQuantity()
    {
        if ($this->data['expiration date']) {
            $todayDate = date('d.m.Y');
            $itemDate = $this->data['expiration date'];

            if (strtotime($todayDate) > strtotime($itemDate)) {
                return 0;
            }
        }

        return $this->data["quantity"];
    }
}
