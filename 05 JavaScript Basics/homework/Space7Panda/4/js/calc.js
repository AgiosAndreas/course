"use strict";
let startCalc = () => {
	let userValue = +prompt('Введите значение', 0);
	
	if (factorial(userValue) === undefined) {
		return alert('Пожалуйста, укажите целое позитивное число') /* Без return отработает второй alert */
	}

	alert(`Факториал ${userValue}! равен: ${factorial(userValue)}`);
};