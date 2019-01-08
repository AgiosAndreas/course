<?php namespace Test;

use PHPUnit\Framework\TestCase;
use App\Core\VendingMachine;
use App\Core\ProductBase;

class BaseProductTest extends TestCase
{
    public function testProductContract()
    {
        $this->expectExceptionMessage("Product items is not an array");
        $products = new ProductBase(12121);
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
}