<?php namespace test;

use PHPUnit\Framework\TestCase;

class TestSumPairs extends TestCase
{
    /**
     * @dataProvider exceptionTestProvider
     */
    public function testContractTests($values, $expected, $message)
    {
        $this->expectExceptionMessage($message);
        sum_pairs($values, $expected);
    }

    public function exceptionTestProvider()
    {
        return [
            [[11, "hello", 7, 5], "s", "s is not integer"],
            [[4, 3, 2, 3, 4], "world", "world is not integer"],
            [2, 2, "2 is not array"],
            [[1], 10, "not enough arguments in array"]
        ];
    }

    /**
     * @dataProvider commonTestProvider
     */
    public function testValidValuesTests($values, $expected, $result)
    {
        $this->assertEquals(sum_pairs($values, $expected), $result);
    }

    public function commonTestProvider()
    {
        return [
            [[11, 3, 7, 5], 10, [3, 7]],
            [[4, 3, 2, 3, 4], 6, [4, 2]],
            [[10, 5, 2, 3, 7, 5], 10, [3, 7]],
            [[0, 0, -2, 3], 2, null]
        ];
    }
}
