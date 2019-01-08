<?php namespace Test;

use PHPUnit\Framework\TestCase;
use App\Core\VendingMachine;

class VendingMachineTest extends TestCase
{
    public function testVendContract()
    {
        $this->expectExceptionMessage("Product data is not an array");
        $products = new VendingMachine("Hi");
    }
}
