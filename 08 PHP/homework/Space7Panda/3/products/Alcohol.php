<?php namespace products\alcohol;

class Alcohol extends ProductBase
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
