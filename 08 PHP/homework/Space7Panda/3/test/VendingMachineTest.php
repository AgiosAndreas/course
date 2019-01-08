<?php namespace Test;

use PHPUnit\Framework\TestCase;
use App\Core\VendingMachine;
use App\Core\ProductBase;
use App\Products\Alcohol;
use App\Products\ProductWithExpDate;

class VendingMachineTest extends TestCase
{
    public function testVendContract()
    {
        $this->expectExceptionMessage("Product data is not an array");
        $products = new VendingMachine("Hi");
    }
}
