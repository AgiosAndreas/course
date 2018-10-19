"use strict";
function startCustomSum() {
	let a = prompt('Укажите "а"\nПробелы и спец. символы не учитываются', '3');
	let b = prompt('Укажите "b"', '5');

	try {
		let sumResult = sum(a, b);

		alert(a + "\n" + "+" + "\n" + b + "\n" + "Равно: " + sumResult);
	} catch (e) {
		alert("Ошибка: " + e.Error + "." + "\nПожалуйста введите целые числа.");
	}
};