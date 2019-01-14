<?php namespace App\Test;

use PHPUnit\Framework\TestCase;
use App\Products\Alcohol;

class AlcoholTest extends TestCase
{

    public function testContract()
    {
        $this->expectExceptionMessage("Product items is not an array");
        $products = new Alcohol(12121);
    }

    public function testGetQuantity()
    {
        $alcohol = new Alcohol(["name" => "Водка", "code" => "A01", "quantity" => 3, "price" => 1]);

        $time = date('H:i');

        if ($time > "18:00") {
            $this->assertEquals($alcohol->getQuantity(), 0);
        } else {
            $this->assertEquals($alcohol->getQuantity(), 3);
        }
    }
}
