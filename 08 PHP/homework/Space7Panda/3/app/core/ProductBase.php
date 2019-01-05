<?php namespace App\Core;

class ProductBase
{
    protected $data;

    public function __construct($data)
    {
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
        $this->data["quantity"]--;
    }
}
