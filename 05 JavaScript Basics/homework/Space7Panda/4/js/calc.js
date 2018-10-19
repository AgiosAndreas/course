"use strict";
function startCalc() {
	let userValue = +prompt("Введите значение", 0);
	
	try {
		let factorialResult = factorial(userValue);

		alert(`Факториал ${userValue}! равен: ${factorialResult}`);
		
	} catch (e) {
		alert("Ошибка: " + e.Error + "." + "\nПожалуйста, укажите целое позитивное число.");
	}
};