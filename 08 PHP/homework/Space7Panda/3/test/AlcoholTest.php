<?php namespace Test;

use PHPUnit\Framework\TestCase;
use App\Core\VendingMachine;
use App\Products\Alcohol;

class AlcoholTest extends TestCase
{

    public function testAlcoholProductContract()
    {
        $this->expectExceptionMessage("Product items is not an array");
        $products = new Alcohol(12121);
    }

    public function testVendAlcoholProducts()
    {
        $items = [
            ["name" => "Водка", "code" => "A01", "quantity" => 3, "price" => 1],
            ["name" => "Вино", "code" => "A02", "quantity" => 7, "price" => 2.60]
        ];

        foreach ($items as $key => $item) {
            $products[$key] = new Alcohol($item);
        }

        $dispenser = new VendingMachine($products);

        $time = date('H:i');

        if ($time > "18:00") {
            $this->assertEquals($dispenser->vend("A01", 2), "Водка закончился!");
        } else {
            $this->assertEquals($dispenser->vend("A01", 2), "Возьмите Водка. Ваша сдача - 1");
        }
    }
}