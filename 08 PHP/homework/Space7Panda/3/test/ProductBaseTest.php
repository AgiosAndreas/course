<?php namespace Test;

use PHPUnit\Framework\TestCase;
use App\Core\ProductBase;

class ProductBaseTest extends TestCase
{
    public function testContract()
    {
        $this->expectExceptionMessage("Product items is not an array");
        $products = new ProductBase(12121);
    }

    /**
     * @dataProvider methodsProvider
     */
    public function testMethods($methods, $result)
    {
        $products = new ProductBase(["name" => "Шоколад белый", "code" => "A01", "quantity" => 10, "price" => 0.60]);

        $this->assertEquals($products->$methods(), $result);
    }

    public function methodsProvider()
    {
        return [
            [getCode, "A01"],
            [getName, "Шоколад белый"],
            [getQuantity, "10"],
            [getPrice, "0.6"]
        ];
    }

    public function testDecreaseQuantity()
    {
        $products = new ProductBase(["quantity" => 1]);

        $this->assertEquals($products->getQuantity(), 1);

        $products->decreaseQuantity();

        $this->assertEquals($products->getQuantity(), 0);

        $products->decreaseQuantity();

        $this->assertEquals($products->getQuantity(), 0);
    }
}
