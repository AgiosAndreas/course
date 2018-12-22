<?php

function sum_pairs($values, $expectedSum) {

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

		if ($find[$currentValue]) {

			$result = [$find[$currentValue], $currentValue];
			return $result;
		}
		
		$firstValue = $values[$i];
		$secondValue = $expectedSum - $firstValue;

		$find[$secondValue] = $firstValue;

	}

	return NULL;
}

$result = [
	sum_pairs([11, 3, 7, 5], 10),
	sum_pairs([4, 3, 2, 3, 4], 6), 
	sum_pairs([10, 5, 2, 3, 7, 5], 10),
	sum_pairs([0, 0, -2, 3], 2)
];

var_dump($result);