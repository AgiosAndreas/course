function sum(str_sum1, str_sum2) {
	var max_length = str_sum1.length > str_sum2.length ? str_sum1.length : str_sum2.length;
	var buff, oversum = 0;
	var result = "";

	for (var i = 1; i <= max_length; i++) {
		buff = +str_sum1.charAt(str_sum1.length - i) + +str_sum2.charAt(str_sum2.length - i) + oversum;
		if (buff > 9) {
			oversum = 1;
			buff -= 10;
		}
		else {
			oversum = 0;
		}
		result = String(buff) + result;
	}
	if (oversum > 0) {
		result = String(oversum) + result;
	}
	return result;
}

// Проверяем работу функции
alert(
	"По заданию:\n" +
	"\"1, 1\" - \"" + sum("1", "1") + "\"\n" +
	"\"9007199254740991, 1\" - \"" + sum("9007199254740991", "1") + "\"\n" +
	"\"Большие числа\" - \"" + sum("90071992547409929007199254740992", "992547409929007199254740992") + "\"\n" +
	"\", 1\" - \"" + sum("", "1") + "\"\n" +
	"От себя:\n" +
	"\"9, 9\" - \"" + sum("9", "9") + "\"\n" +
	"\", \" - \"" + sum("", "") + "\"\n"
);
