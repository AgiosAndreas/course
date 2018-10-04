"use strict";
let sum = (a, b) => {
	a = a.replace(/[^0-9]/gim, "");
	b = b.replace(/[^0-9]/gim, "");

	let addon = 0;
	let result = "";

	for (let i = 1; i <= a.length || i <= b.length; i++) {
			
		let aNum = (i <= a.length) ? parseInt(a[a.length - i], 10) : 0;
		let bNum = (i <= b.length) ? parseInt(b[b.length - i], 10) : 0;
		let sum = aNum + bNum + addon;

		if (sum > 9) {
			addon = 1;
			sum -= 10;
		} else {
			addon = 0;
		}

		result = sum + result;
	}

	return result;
};