<?php namespace test;

use PHPUnit\Framework\TestCase;

class TestSumPairs extends TestCase
{
    public function testValuesIsNotInteger()
    {
        $this->expectExceptionMessage("s is not integer");
        sum_pairs([11, "hello", 7, 5], "s");
    }

    public function testExpectedResultIsNotInteger()
    {
        $this->expectExceptionMessage("world is not integer");
    
        sum_pairs([4, 3, 2, 3, 4], "world");
    }

    public function testValuesIsNotArr()
    {
        $this->expectExceptionMessage("2 is not array");
        sum_pairs(2, 2);
    }

    public function testNotEnoughArguments()
    {
        $this->expectExceptionMessage("not enough arguments in array");
        sum_pairs([1], 10);
    }

    /**
     * @dataProvider commonTestProvider
     */
    public function testValidValuesTest($function, $expected)
    {
        $this->assertEquals($function, $expected);
    }

    public function commonTestProvider()
    {
        return [
            [sum_pairs([11, 3, 7, 5], 10), [3, 7]],
            [sum_pairs([4, 3, 2, 3, 4], 6), [4, 2]],
            [sum_pairs([10, 5, 2, 3, 7, 5], 10), [3, 7]],
            [sum_pairs([0, 0, -2, 3], 2), null]
        ];
    }
}
