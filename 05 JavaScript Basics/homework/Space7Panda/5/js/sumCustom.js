"use strict";
function startCustomSum() {
	let a = prompt('Укажите "а"\nПробелы и спец. символы не учитываются', '3');
	let b = prompt('Укажите "b"', '5');

	try {
		alert(sum(a, b));
	} catch (e) {
		alert("Ошибка: " + e.Error + "." + "\nПожалуйста введите целые числа.");
	}
};