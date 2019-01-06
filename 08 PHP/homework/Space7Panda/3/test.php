<?php namespace Test;

use PHPUnit\Framework\TestCase;
use App\Core\ProductBase;
use App\Core\VendingMachine;

class TestVendingMachine extends TestCase
{
    public function testVendBasicProduct()
    {
        $items = [
            ["name" => "Шоколад белый", "code" => "A01", "quantity" => 10, "price" => 0.60],
            ["name" => "Шоколад молочный", "code" => "A02", "quantity" => 5, "price" => 0.60],
            ["name" => "Пиво светлое", "code" => "A03", "quantity" => 1, "price" => 0.65],
            ["name" => "Вода без газа", "code" => "A04", "quantity" => 1, "price" => 0.25]
        ];

        foreach ($items as $key => $item) {
            $products[$key] = new ProductBase($item);
        }

        $dispenser = new VendingMachine($products);

        $this->assertEquals($dispenser->vend('A01', 6), null);
    }
}