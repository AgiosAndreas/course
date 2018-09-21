function ndigit(number, index) {
	if (isNaN(number) == true ||
		isNaN(index)  == true ||
		Number.isInteger(number) == false ||
		Number.isInteger(index)  == false )
	{
		return undefined;
	}

	number = Math.abs(number);
	var divider = Math.pow(10, index - 1);

	if (index < 1 || number < divider) {
		return -1;
	}

	return (number / divider | 0) % 10;
}