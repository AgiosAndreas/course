"use strict";

function normalize(text) {
	var result = "";
	var is_space = true;
	var i;

	// Первым символом не может быть пробел + два пробела не могут идти один за другим
	// Хотел использовать .trim(), но метод слишком свежий и не поддерживатется старыми браузерами :)
	for (i = 0; i < text.length; i++) {
		if (!((is_space) && (text[i] === " "))) {
			result += text[i];
			is_space = text[i] === " ";
		}
	}
	// Убираем пробелы в конце строки
	while (result.charAt(result.length - 1) === " ") {
		result = result.slice(0, result.length - 1);
	}
	// Заглавной может быть только первая буква в строке
	result = result.charAt(0).toUpperCase() + result.substring(1).toLowerCase();
	// Возвращаем результат, делая это в отдельной строке для читабельности кода
	return result;
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
