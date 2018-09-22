"use strict";
let sort = (value) => {
	value = value.trim().replace(/\s+/g, " ");

	if (value.length === 0) {
		return [];
	};

	let unsortedNumbers = value.split(" ");
	
	let numbersArr = unsortedNumbers.map((num, i) => {
		return {
			weight: num * (i + 1),
			number: parseInt(num, 10)
		};
	});
	
	numbersArr.sort((a, b) => {
		return (a.weight != b.weight) ? b.weight - a.weight : b.number - a.number;
	});

	return numbersArr.map(num => {
		return console.log(num.number);
	});
};