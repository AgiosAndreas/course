"use strict";

function factorial(count) {
	if (count <= 0) {
		return 1;
	}
	return count * factorial(count - 1);
}

// Проверяем работу функции
alert(
	"По заданию:\n" +
	"\"5\" - \"" + factorial(5) + "\"\n" +
	"\"0\" - \"" + factorial(0) + "\"\n" +
	"\"11\" - \"" + factorial(11) + "\"\n"
 );
