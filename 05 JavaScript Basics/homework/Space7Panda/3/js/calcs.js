"use strict";
function startCustomCalc() {
	let number = +prompt('Введите число', 12);
	let index  = +prompt('Введите порядковый номер числа с конца', 1);
	
	try {
		let ndigitResult = ndigit(number, index);

		if (ndigitResult == -1) {
			alert(`Ошибка: число ${number} не состоит из ${index} чисел`);

			return;
		}

		alert(`${ndigitResult} - является ${index}м числом из ${number}`);

	} catch (e) {
		alert("Ошибка: " + e.Error + "." + "\nПожалуйста, укажите целое число.");
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