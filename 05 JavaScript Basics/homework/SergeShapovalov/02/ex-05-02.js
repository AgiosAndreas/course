function trim_all_spaces(text) {
	var STR_SPACE = " ";

	var result = "";
	var is_space = true;

	for (var i = 0; i < text.length; i++) {
		if (!(is_space && text[i] === STR_SPACE)) {
			result += text[i];
			is_space = text[i] === STR_SPACE;
		}
	}
	return result.trim();
}

function sort(str_numbers) {
	var mas_numb = [], count_numb = [], sort_numb = [];

	// Заполняем неотсортированный массив значениями из строки, используя функцию из предыдущего задания :)
	mas_numb = trim_all_spaces(str_numbers).split(" ");
	// Сортировка массива по весу элементов. Задача специфическая, в отдельную функцию выносить смысла нет.
	// Существующий метод sort(), даже если задать свою функцию сравнения, не подходит, т.к. нужно учитывать индекс.
	// Использовал достаточно простой и понятный алгоритм сортировки. Задаем начальные значения индексов.
	for (var i = 0; i < mas_numb.length; i++) {
		count_numb[i] = 0;
	}
	// Выполняем сортировку в соответствии с заданием
	for (i = 0; i < mas_numb.length-1; i++) {
		for (var j = i + 1; j < mas_numb.length; j++)	{
			if ((mas_numb[i] * (i + 1)) > (mas_numb[j] * (j + 1))) {
				count_numb[j]++;
			}	else {
				count_numb[i]++;
			}
		}
	}
	// Выводим результат в отдельный массив
	for (var i = 0; i < mas_numb.length; i++) {
		sort_numb[count_numb[i]] = mas_numb[i];
	}
	// Возвращаем результат функции
	return sort_numb;
}

// Проверяем работу функции
alert(
	"По заданию:\n" +
	"\"5  3 30 25 \" - \"" + sort("5  3 30 25 ") + "\"\n" +
	"\"   \" - \"" + sort("   ") + "\"\n" +
	"От себя:\n" +
	"\"\" - \"" + sort("") + "\"\n" +
	"\"18 9 6 4.5 -3\" - \"" + sort("18 9 6 4.5 -3") + "\"\n" +
	"\"16 8 6 5 2\" - \"" + sort("16 8 6 5 2") + "\""
);
