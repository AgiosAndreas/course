<?php

function sum_pairs($values, $expectedSum) {

	if (is_array($values) == false) {
		throw new Exception("$values is not array");
	}

	if (is_int($expectedSum) == false) {
		throw new Exception("$expectedSum is not integer");
	}

	if (count($values) == 1) {
		throw new Exception("not enough arguments in array");
	}

	for ($i = 0; $i + 1 < count($values); $i++) {

		if (is_int($values[$i]) == false) {
			throw new Exception("$values[$i] is not integer");
		}

		$firstValue = $values[$i];

		for ($j = $i + 1; $j < count($values); $j++) {

			if (is_int($values[$j]) == false) {
				throw new Exception("$values[$j] is not integer");
			}

			$secondValue = $values[$j];
			$sum = $firstValue + $secondValue;
			
			if ($sum == $expectedSum) {
				return "[$firstValue, $secondValue]";
			}
		}
	}

	return NULL;
}

echo sum_pairs([11, 3, 7, 5], 10) . "\n";
echo sum_pairs([4, 3, 2, 3, 4], 6) . "\n";
echo sum_pairs([10, 5, 2, 3, 7, 5], 10) . "\n";
echo sum_pairs([0, 0, -2, 3], 2) . "\n";