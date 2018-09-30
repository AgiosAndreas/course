"use strict";
function startCalc() {
	let userValue = +prompt('Введите значение', 0);
	
	if (factorial(userValue) === undefined) {
		return alert('Пожалуйста, укажите целое позитивное число');
	}

	alert(`Факториал ${userValue}! равен: ${factorial(userValue)}`);
};