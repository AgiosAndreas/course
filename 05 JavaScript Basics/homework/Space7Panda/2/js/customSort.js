"use strict";
function startCustomSort() {
	let value = prompt('Укажите числа через пробел.', '1 3 2');

	try {
		alert(`[${sort(value)}]`);
	} catch(e) {
		alert("Ошибка: " + e.Message +"." + "\nПожалуйста, укажите целые числа через пробел.")
	}
};