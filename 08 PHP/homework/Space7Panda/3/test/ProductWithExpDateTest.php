<?php namespace Test;

    use PHPUnit\Framework\TestCase;
    use App\Core\VendingMachine;
    use App\Products\ProductWithExpDate;

class ProductWithExpDateTest extends TestCase
{
    /**
     * @dataProvider productWithExpDateContractProvider
     */
    public function testProductWithExpDateContract($value, $message)
    {
        $this->expectExceptionMessage($message);
        $products = new ProductWithExpDate($value);
    }

    public function productWithExpDateContractProvider()
    {
        return [
            [12121, "Product items is not an array"],
            [["name" => "test"], "expiration date is no defined in array"]
        ];
    }

    public function testVendProductsWithExpDate()
    {
        $past = date('d.m.y', strtotime('-7 days'));
        $future = date('d.m.y', strtotime('+7 days'));

        $items = [
            ["name" => "Колбаса", "code" => "A01", "quantity" => 1, "price" => 2.05, "expiration date" => $past],
            ["name" => "Консервы", "code" => "A02", "quantity" => 10, "price" => 1.05, "expiration date" => $future]
        ];

        foreach ($items as $key => $item) {
            $products[$key] = new ProductWithExpDate($item);
        }

        $dispenser = new VendingMachine($products);

        $this->assertEquals($dispenser->vend("A01", 3), "Колбаса закончился!");
        $this->assertEquals($dispenser->vend("A02", 2), "Возьмите Консервы. Ваша сдача - 0.95");
    }
}
