<?php

function rgb($r, $g, $b) {

	if (!is_int($r) || !is_int($r) || !is_int($r)) {
		throw new Exception("one of numbers is not integer");
	}

	if ($r < 0 || $g < 0 || $b < 0) {
		throw new Exception("one of numbers is negative");
	}

	if ($r > 255 || $g > 255 || $b > 255) {
		throw new Exception("value cannot be bigger than 255");
	}

	$boolMerged = $r << 16 | $g << 8 | $b << 0; 
	
	$result = dechex($boolMerged);
	
	return strtoupper(("#".substr("000000".$result, -6)));
}

echo rgb(255, 255, 255) . "\n";
echo rgb(0, 0, 0) . "\n";
echo rgb(148, 0, 211) . "\n";