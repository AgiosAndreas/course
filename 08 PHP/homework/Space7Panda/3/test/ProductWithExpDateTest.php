<?php namespace Test;

use PHPUnit\Framework\TestCase;
use App\Core\VendingMachine;
use App\Products\ProductWithExpDate;

class ProductWithExpDateTest extends TestCase
{
    /**
     * @dataProvider contractProvider
     */
    public function testContract($value, $message)
    {
        $this->expectExceptionMessage($message);
        $products = new ProductWithExpDate($value);
    }

    public function contractProvider()
    {
        return [
            [12121, "Product items is not an array"],
            [["name" => "test"], "expiration date is no defined in array"]
        ];
    }

    /**
     * @dataProvider getQuantityProvider
     */
    public function testGetQuantity($item, $result)
    {
        $product = new ProductWithExpDate($item);

        $this->assertEquals($product->getQuantity(), $result);
    }

    public function getQuantityProvider()
    {
        $past = date('d.m.y', strtotime('-7 days'));
        $future = date('d.m.y', strtotime('+7 days'));

        return [
            [["name" => "Колбаса", "code" => "A01", "quantity" => 1, "price" => 2.05, "expiration date" => $past], 0],
            [["name" => "Консервы", "code" => "A02", "quantity" => 4, "price" => 1.05, "expiration date" => $future], 4]
        ];
    }
}
