"use strict";
function startCustomSum() {
	let a = prompt('Укажите "а"\nПробелы и спец. символы не учитываются', '3');
	let b = prompt('Укажите "b"', '5');

	try {

		if (sum(a, b) === undefined ) {
			throw {"Error":"value is not a number"};
		}

	 	alert(sum(a, b));
	} catch (e) {
		console.log("Finish with error " + e.Error);
		
		alert('Ошибка: Пожалуйста введите целые числа.');
	}
};