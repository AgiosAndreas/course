"use strict";
let startCustomSort = () => {
	let value = prompt('Укажите числа через пробел.\nДругие символы будут проигнорированы.', '1 3 2');

	alert(`[${sort(value)}]`);
};