"use strict";
let sort = (value) => {
	value = value.replace(/[^-0-9]/gim, " ");
	value = value.trim().replace(/\s+/g, " ");

	if (value.length === 0) {
		return '[]';
	}

	let unsortNum = value.split(" ");
	let items = [];

	for (let i = 0; i < unsortNum.length; i++) {
		items.push({
			weight: unsortNum[i] * (i + 1),
			value: unsortNum[i]
		});
	}

	items.sort((a, b) => {
		return (a.weight !== b.weight) ? b.weight - a.weight : b.number - a.number;
	});

	return items.map(num => {
		return num.value;
	});
};
