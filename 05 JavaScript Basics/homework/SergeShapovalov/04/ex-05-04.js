function factorial(count) {
	return count <= 0 ? 1 : count * factorial(count - 1);
}

// Проверяем работу функции
alert(
	"По заданию:\n" +
	"\"5\" - \"" + factorial(5) + "\"\n" +
	"\"0\" - \"" + factorial(0) + "\"\n" +
	"\"11\" - \"" + factorial(11) + "\"\n" +
	"От себя:\n" +
	"\"-2\" - \"" + factorial(-2) + "\"\n"
 );
