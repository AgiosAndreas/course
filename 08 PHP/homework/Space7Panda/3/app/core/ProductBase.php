<?php namespace App\Core;

class ProductBase
{
    protected $data;

    public function __construct($data)
    {
        if (!is_array($data)) {
            throw new \Exception("Product items is not an array");
        }

        $this->data = $data;
    }

    public function getCode()
    {
        return $this->data['code'];
    }

    public function getName()
    {
        return $this->data["name"];
    }

    public function getQuantity()
    {
        return $this->data["quantity"];
    }

    public function getPrice()
    {
        return $this->data["price"];
    }

    public function decreaseQuantity()
    {
        if ($this->data["quantity"] >= 1) {
            $this->data["quantity"]--;
        }
    }
}
