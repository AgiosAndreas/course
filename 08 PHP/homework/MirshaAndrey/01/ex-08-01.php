<?php

function rgb($R, $G, $B)
	{
	if (!is_int($R) || $R < 0 || $R > 255)
		{
		throw new Exception("Incorrect value. Value must be integer that >= 0 and < 256");
		}

	$R = dechex($R);

	if (!is_int($G) || $G < 0 || $G > 255)
		{
		throw new Exception("Incorrect value. Value must be integer that >= 0 and < 256");
		}

	$G = dechex($G);

	if (!is_int($B) || $B < 0 || $B > 255)
		{
		throw new Exception("Incorrect value. Value must be integer that >= 0 and < 256");
		}

	$B = dechex($B);

	return 'color #' . $R . $G . $B;
	}

echo rgb(123, 97, 167) . "\n";
echo rgb(148, 0, 211) . "\n";
echo rgb(0, 0, 0) . "\n";
