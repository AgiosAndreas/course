<?php

function sum_pairs($values, $expectedSum) {
	
	for ($i = 0; $i + 1 < count($values); $i++) {

		$firstValue = $values[$i];

		for ($j = $i + 1; $j < count($values); $j++) {
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