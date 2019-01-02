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
            $currentValue = $values[$i];

            $expectedValue = $expectedSum - $currentValue;

            if ($find[$currentValue] == true) {
                $firstValue = $expectedSum - $currentValue;

                return [$firstValue, $currentValue];
            }

            $find[$expectedValue] = true;
        }

        return null;
    }

    function test_sum_pairs($function, $expectedResult)
    {
        if (!is_array($expectedResult) && !is_null($expectedResult)) {
            throw new Exception("$expectedResult is not array or null");
        }

        if ($function == $expectedResult) {
            echo "Successfull test";
        } else {
            echo "Test is failed";
        }
    }

    test_sum_pairs(sum_pairs([11, 3, 7, 5], 10), [3, 7]);
    test_sum_pairs(sum_pairs([4, 3, 2, 3, 4], 6), [4, 2]);
    test_sum_pairs(sum_pairs([10, 5, 2, 3, 7, 5], 10), [3, 7]);
    test_sum_pairs(sum_pairs([0, 0, -2, 3], 2), null);
