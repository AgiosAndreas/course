<?php namespace products\withExpDate;

class WithExpDate extends ProductBase
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
