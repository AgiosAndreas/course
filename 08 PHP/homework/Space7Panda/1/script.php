<?php

function validate($variable) {

	if (!is_int($variable) || $variable < 0 || $variable > 255) {
		throw new Exception("Incorrect value for variable ($variable) Value must be integer that >= 0 and < 256");
	}

}

function rgb($r, $g, $b) {

	validate($r);
	validate($g);
	validate($b);

	$rgbMultiplied = $r << 16 | $g << 8 | $b; 
	
	$result = dechex($rgbMultiplied);
	
	return strtoupper(("#".substr("000000".$result, -6)));
}

echo rgb(255, 255, 255) . "\n";
echo rgb(0, 0, 0) . "\n";
echo rgb(148, 0, 211) . "\n";