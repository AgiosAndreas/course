"use strict";
function startCustomCalc() {
	let number = +prompt('Введите число', 12);
	let index  = +prompt('Введите порядковый номер числа с конца', 1);
	
	if (ndigit(number, index) === undefined) {
		alert('Пожалуйста, укажите целое число');
		return;
	}

	if (ndigit(number, index) === -1) {
		alert(`Ошибка: число ${number} не состоит из ${index} чисел`);
		return;
	}

	alert(`${ndigit(number, index)} - является ${index}м числом из ${number}`);
}

function startDefaultCalc() {
	alert(`
	"125692, 3" - "${ndigit(125692, 3)}"
	"10, 1"     - "${ndigit(10, 1)}"
	"-793, 2"   - "${ndigit(-793, 2)}"
	"9, 2"      - "${ndigit(9, 2)}"
	"329, 0"    - "${ndigit(329, 0)}"
	`);
};