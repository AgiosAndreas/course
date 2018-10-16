"use strict";
function startCalc() {
	let userValue = +prompt("Введите значение", 0);
	
	try {
		alert(`Факториал ${userValue}! равен: ${factorial(userValue)}`);
	} catch (e) {
		alert("Ошибка: " + e.Error + "." + "\nПожалуйста, укажите целое позитивное число.");
	}
};