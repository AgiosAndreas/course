<?php namespace Test;

use PHPUnit\Framework\TestCase;
use App\Core\VendingMachine;
use App\Core\ProductBase;
use App\Products\Alcohol;
use App\Products\WithExpDate;

class VendingMachineTest extends TestCase
{
    public function testProductContract()
    {
        $this->expectExceptionMessage("Product items is not an array");
        $products = new ProductBase(12121);
    }

    public function testVendContract()
    {
        $this->expectExceptionMessage("Product data is not an array");
        $products = new VendingMachine("Hi");
    }

    /**
     * @dataProvider vendBasicProductsProvider
     */
    public function testVendBasicProducts($code, $cash, $result)
    {
        $items = [
            ["name" => "Шоколад белый", "code" => "A01", "quantity" => 10, "price" => 0.60],
            ["name" => "Шоколад молочный", "code" => "A02", "quantity" => 5, "price" => 0.60],
            ["name" => "Пиво светлое", "code" => "A03", "quantity" => 0, "price" => 0.65],
            ["name" => "Вода без газа", "code" => "A04", "quantity" => 1, "price" => 0.25]
        ];

        foreach ($items as $key => $item) {
            $products[$key] = new ProductBase($item);
        }

        $dispenser = new VendingMachine($products);

        $this->assertEquals($dispenser->vend($code, $cash), $result);
    }

    public function vendBasicProductsProvider()
    {
        return [
            ["A01", 0.6, "Возьмите Шоколад белый"],
            ["A02", 0.1, "Недостаточно денег!"],
            ["A03", 0.6, "Пиво светлое закончился!"],
            ["A04", 3, "Возьмите Вода без газа. Ваша сдача - 2.75"],
            ["A05", 0.2, "Такого товара нет в автомате!"],
        ];
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

    public function testVendProductsWithExpDate()
    {
        $items = [
            ["name" => "Колбаса", "code" => "A01", "quantity" => 1, "price" => 2.05, "expiration date" => "20.12.2018"],
            ["name" => "Консервы", "code" => "A02", "quantity" => 10, "price" => 1.05, "expiration date" => "20.12.2025"]
        ];

        foreach ($items as $key => $item) {
            $products[$key] = new WithExpDate($item);
        }

        $dispenser = new VendingMachine($products);

        $this->assertEquals($dispenser->vend("A01", 2), "Колбаса закончился!");
        $this->assertEquals($dispenser->vend("A02", 2), "Возьмите Консервы. Ваша сдача - 0.95");
    }
}
