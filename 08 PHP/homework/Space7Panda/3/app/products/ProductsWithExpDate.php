<?php namespace App\Products;

use App\Core\ProductBase;

class ProductWithExpDate extends ProductBase
{
    private $todayDate;
    private $itemDate;

    public function __construct($data)
    {
        parent::__construct($data);

        if (!isset($this->data['expiration date'])) {
            throw new \Error("expiration date is no defined in array");
        }
    }

    public function getQuantity()
    {
        $this->todayDate = date('d.m.Y');
        $this->expDate = $this->data['expiration date'];

        if ($this->todayDate > $this->expDate) {
            return 0;
        }

        return $this->data["quantity"];
    }
}
