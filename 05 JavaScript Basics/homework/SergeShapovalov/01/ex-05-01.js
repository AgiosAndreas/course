function normalize(text) {
	var STR_SPACE = " ";

	var result = "";
	var is_space = true;

	// Первым символом не может быть пробел + два пробела не могут идти один за другим
	for (var i = 0; i < text.length; i++) {
		if (!(is_space && text[i] === STR_SPACE)) {
			result += text[i];
			is_space = text[i] === STR_SPACE;
		}
	}
	// Заглавной может быть только первая буква в строке
	result = result.charAt(0).toUpperCase() + result.substring(1).toLowerCase();
	// Возвращаем результат, делая это в отдельной строке для читабельности кода
	return result.trim();
}

// Проверяем работу функции
alert(
	"По заданию:\n" +
	"\"" + normalize(" HElLo,    wORld  !   ") + "\"\n" +
	"\"" + normalize("hELLo  ") + "\"\n" +
	"\"" + normalize("   ") + "\"\n\n" +
	"От себя:\n" +
	"\"" + normalize(" h ") + "\"\n" +
	"\"" + normalize("") + "\""
);
