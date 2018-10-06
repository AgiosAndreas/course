"use strict";
function startCalc() {
	let userValue = +prompt('Введите значение', 0);
	
	if (factorial(userValue) === undefined) {
		alert('Пожалуйста, укажите целое позитивное число');
		return;
	}

	alert(`Факториал ${userValue}! равен: ${factorial(userValue)}`);
};