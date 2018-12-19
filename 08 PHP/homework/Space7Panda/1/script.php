<?php

function rgb($r, $g, $b) {

	if (!is_int($r)) {
		throw new Exception("variable 'r'($r) is not integer");
	}

	if (!is_int($g)) {
		throw new Exception("variable 'g'($g)is not integer");
	}

	if (!is_int($b)) {
		throw new Exception("variable 'b'($b) is not integer");
	}

	if ($r < 0) {
		throw new Exception("variable 'r'($r) is negative");
	}

	if ($g < 0) {
		throw new Exception("variable 'g'($g) is negative");
	}

	if ($b < 0) {
		throw new Exception("variable 'b'($b) is negative");
	}

	if ($r > 255) {
		throw new Exception("value 'r'($r) cannot be bigger than 255");
	}

	if ($g > 255) {
		throw new Exception("value 'r'($g) cannot be bigger than 255");
	}

	if ($b > 255) {
		throw new Exception("value 'r'($b) cannot be bigger than 255");
	}

	$boolMerged = $r << 16 | $g << 8 | $b << 0; 
	
	$result = dechex($boolMerged);
	
	return strtoupper(("#".substr("000000".$result, -6)));
}

echo rgb(255, 255, 255) . "\n";
echo rgb(0, 0, 0) . "\n";
echo rgb(148, 0, 211) . "\n";