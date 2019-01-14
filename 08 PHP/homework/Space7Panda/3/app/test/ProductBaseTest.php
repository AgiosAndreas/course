<?php namespace App\Test;

use PHPUnit\Framework\TestCase;
use App\Core\ProductBase;

class ProductBaseTest extends TestCase
{
    public function testContract()
    {
        $this->expectExceptionMessage("Product items is not an array");
        $products = new ProductBase(12121);
    }

    public function testMethods()
    {
        $data = ["name" => "Шоколад белый", "code" => "A01", "quantity" => 10, "price" => 0.60];
        $products = new ProductBase($data);

        $this->assertEquals($products->getCode(), $data["code"]);
        $this->assertEquals($products->getName(), $data["name"]);
        $this->assertEquals($products->getQuantity(), $data["quantity"]);
        $this->assertEquals($products->getPrice(), $data["price"]);
    }
    public function testDecreaseQuantityShouldReturnZeroWhenQuantityEquallyOne()
    {
        $products = new ProductBase(["quantity" => 1]);

        $products->decreaseQuantity();

        $this->assertEquals($products->getQuantity(), 0);
    }

    public function testDecreaseQuantityShouldReturnExceptionOnQuantityEquallyZero()
    {
        $products = new ProductBase(["quantity" => 0]);

        $this->expectExceptionMessage('Cannot decrease item with quanity = 0');

        $products->decreaseQuantity();
    }
}
