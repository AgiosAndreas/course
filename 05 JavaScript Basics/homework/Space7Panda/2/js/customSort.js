"use strict";
let startCustomSort = () => {
	let value = prompt('Укажите числа через пробел.', '1 3 2');

	if (sort(value) == undefined) {
		alert('Ошибка: пожалуйста укажите целые числа');
		return;
	}
	
	alert(`[${sort(value)}]`);
};