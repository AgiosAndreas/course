"use strict";
function startCalc() {
	let userValue = +prompt('Введите значение', 0);
	
	try {

	if (factorial(userValue) === undefined) {
		throw {"Status":"Stop function."};
	}

	alert(`Факториал ${userValue}! равен: ${factorial(userValue)}`);
	
	} catch (e) {

		console.log(e.Status);

		alert('Пожалуйста, укажите целое позитивное число');
}};