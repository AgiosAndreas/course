"use strict";
let startCalc = (userValue = +prompt('Введите значение', 0)) => {
	
	return (factorial(userValue) === undefined) ? 
		alert('Пожалуйста, укажите целое позитивное число') : 
		alert(`Факториал ${userValue}! равен: ${factorial(userValue)}`);
};