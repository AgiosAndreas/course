"use strict";
let startCustomSum = () => {
	let a = prompt('Укажите "а"\nПробелы и спец. символы не учитываются', '3');
	let b = prompt('Укажите "b"', '5');

	return sum(a, b);
};