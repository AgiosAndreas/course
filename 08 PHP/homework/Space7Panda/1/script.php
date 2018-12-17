<?php

function rgb($r, $g, $b) {

	$arr = [$r, $g, $b];
	$result = "#";

	for ($i = 0; $i < count($arr); $i++) {

		if (is_int($arr[$i]) == false) {
			throw new Exception("$arr[$i] is not integer");
		}

		if ($arr[$i] < 0) {
			throw new Exception("$arr[$i] is negative");
		}

		switch (true) {
			case $arr[$i] == 0;
				$word = "00";
				break;

			case $arr[$i] <= 255;
				$word = dechex($arr[$i]);
				break;

			default:
				$word = "FF";
				break;
		}
	
		$result .= $word;
	}
	
	return strtoupper($result);
}

echo rgb(255, 255, 255) . "\n";
echo rgb(255, 255, 300) . "\n";
echo rgb(0, 0, 0) . "\n";
echo rgb(148, 0, 211) . "\n";

