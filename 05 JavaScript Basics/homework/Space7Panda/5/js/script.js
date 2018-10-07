"use strict";
let sum = (a, b) => {
	try {

		if(!a.match(/^\d+$/) || !b.match(/^\d+$/)) {
			throw {"Message":"'a' or 'b' is not a number"};
		} 

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
	
	} catch(e) {

		console.log("Error: " + e.Message);
		return;
	}
};