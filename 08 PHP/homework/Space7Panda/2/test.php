<?php namespace test;

use PHPUnit\Framework\TestCase;

include "script.php";

class TestSumPairs extends TestCase
{
    public function testFunction()
    {
        $this->assertEquals(sum_pairs([11, 3, 7, 5], 10), [3, 7]);
        $this->assertEquals(sum_pairs([4, 3, 2, 3, 4], 6), [4, 2]);
        $this->assertEquals(sum_pairs([10, 5, 2, 3, 7, 5], 10), [3, 7]);
        $this->assertEquals(sum_pairs([0, 0, -2, 3], 2), null);
    }
}
