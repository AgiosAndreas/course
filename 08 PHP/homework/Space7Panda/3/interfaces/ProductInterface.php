<?php namespace product;

interface ProductInterface
{
    public function getCode();
    public function getName();
    public function getQuantity();
    public function getPrice();
    public function decreaseQuantity();
}
