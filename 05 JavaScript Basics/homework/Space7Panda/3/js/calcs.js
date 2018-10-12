"use strict";
function startCustomCalc() {
	let number = +prompt('Введите число', 12);
	let index  = +prompt('Введите порядковый номер числа с конца', 1);
	
	try {

		if (ndigit(number, index) === undefined) {
			throw {"Error":"return undefined"}
		}

		if (ndigit(number, index) === -1) {
			throw {"Error":"return -1"}
		}

		alert(`${ndigit(number, index)} - является ${index}м числом из ${number}`);

	} catch (e) {
		
		if (e.Error == "return undefined") {
			alert('Пожалуйста, укажите целое число');
		}

		if (e.Error == "return -1") {
			alert(`Ошибка: число ${number} не состоит из ${index} чисел`);
		}
	}
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