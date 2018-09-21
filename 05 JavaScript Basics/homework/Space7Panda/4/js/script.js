function factorial(n) {
	if (isNaN(n) == true || n < 0 || Number.isInteger(n) == false) {
		return undefined;
	}

	if (n <= 1) {
		return 1;
	}

	return n * factorial(n - 1);
}	