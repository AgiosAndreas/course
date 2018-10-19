"use strict";
function startCustomSort() {
	let value = prompt("Укажите числа через пробел.", "1 3 2");

	try {
		let sortResult = sort(value);

		alert(`Результат сортировки: [${sortResult}]`);
	} catch(e) {
		alert("Ошибка: " + e.Message +"." + "\nПожалуйста, укажите целые числа через пробел.")
	}
};