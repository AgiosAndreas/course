<?php

function rgb($r, $g, $b) {

	if (!is_int($r) || $r < 0 || $r > 255) {
		throw new Exception("Incorrect value for variable 'r':($r) Value must be integer that >= 0 and < 256");
	}

	if (!is_int($g) || $g < 0 || $g > 255) {
		throw new Exception("Incorrect value for variable 'g':($g) Value must be integer that >= 0 and < 256");
	}

	if (!is_int($b) || $b < 0 || $b > 255) {
		throw new Exception("Incorrect value for variable 'b':($b) Value must be integer that >= 0 and < 256");
	}

	$rgbMultiplied = $r << 16 | $g << 8 | $b; 
	
	$result = dechex($rgbMultiplied);
	
	return strtoupper(("#".substr("000000".$result, -6)));
}

echo rgb(255, 255, 255) . "\n";
echo rgb(0, 0, 0) . "\n";
echo rgb(148, 0, 211) . "\n";