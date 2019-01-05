<?php

function sum_pairs($values, $expectedSum)
{
    if (is_array($values) == false) {
        throw new Exception("$values is not array");
    }

    if (is_int($expectedSum) == false) {
        throw new Exception("$expectedSum is not integer");
    }

    $arrCount = count($values);

    if ($arrCount < 2) {
        throw new Exception("not enough arguments in array");
    }

    $find = array();

    for ($i = 0; $i < $arrCount; $i++) {
        if (is_int($values[$i]) == false) {
            throw new Exception("$values[$i] is not integer");
        }

        $currentValue = $values[$i];

        $expectedValue = $expectedSum - $currentValue;

        if (isset($find[$currentValue])) {
            $firstValue = $expectedSum - $currentValue;

            return [$firstValue, $currentValue];
        }

        $find[$expectedValue] = true;
    }

    return null;
}
