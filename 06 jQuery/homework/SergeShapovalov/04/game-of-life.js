"use strict";

let options = loadOptions();
let universe = new Universe(options.width, options.height);
let scope = new Visualization(options);

//------------------------------------------------------------------------------

function loadOptions() {
	// Загружаем настройки игры
	let options = {
		width: getSettingValue("#input-width-area", 1, 10000, 40, "ширины поля"),
		height: getSettingValue("#input-height-area", 1, 10000, 25, "высоты поля"),
		blockSize: getSettingValue("#input-block-size", 1, 1000, 20, "размера блока"),
		blockPadding: getSettingValue("#input-block-padding", 0, 100, 1, "отступа блока"),
		gridWidth: getSettingValue("#input-grid-width", 0, 100, 1, "толщины сетки"),
		lifetime: getSettingValue("#input-speed-animation", 10, 100000, 200, "скорости анимации"),
		gridColor: "#aaa",
		gridMoveColor: "#f00",
		canvas: "#game-area"
	}

	return options;
}

//------------------------------------------------------------------------------

function getSettingValue(idValue, min, max, defaultValue, errorMessage) {
	// Получение корректного значения от элемента в браузере
	let result = parseInt($(idValue).val(), 10);
	result = Math.round(result);

	if (isNaN(result) || result < min || result > max) {

		result = defaultValue;
		$(idValue).val(defaultValue);
		showMessage("Изменение параметров",
			"Значение " + errorMessage + " задано некорректно.\n" +
			"Параметр должен находиться в пределах от " + min + " до " + max + ".\n" +
			"Установлено значение по умолчанию, как " + defaultValue + ".");
	}

	return result;
}

//------------------------------------------------------------------------------

function showMessage(title, textMessage) {
	// Показываем сообщение пользователю
	$("#title-message").text(title);
	$("#text-message").text(textMessage);
	$("#panel-message").css("display", "block");
	$("#button-message-ok").focus();
}

//------------------------------------------------------------------------------

function startGame() {
	// Запуск игры
	let timer = setInterval(function() {
		if (universe.isPlay) {

			tickGame();

			if (!universe.isPlay) {
				setPlayStatus(false);
				clearInterval(timer);
			}
		} else {
			clearInterval(timer);
		}
	}, options.lifetime);
}

//------------------------------------------------------------------------------

function tickGame() {
	// Обработка смены одного поколения жизни
	let resultTick = universe.tickLife();
	universe.life = scope.repaintArea(universe.life, resultTick.nextLife, universe.keyToCoordinates);
	updateGeneration(universe.generationCount)

	if (!resultTick.amountLives) {
		showMessage("Игра окончена",
			"Жизнь погибла или не была добавлена на поле.\n" +
			"Пожалуйста, воспользуйтесь инструментами панели \"Редактирование\".");
	} else if (!resultTick.countDifferents) {
		showMessage("Игра окончена",
			"Жизнь не развивается. Следующее поколение жизни полностью аналогично предыдущему.\n" +
			"Добавьте новую жизнь на поле или начните заново.");
	}
}

//------------------------------------------------------------------------------

function setPlayStatus(play) {
	// Останавливаем или запускаем игру, обновляем статус кнопки
	universe.isPlay = play;
	if (play) {
		$("#button-start").text("Пауза");
	} else {
		$("#button-start").text("Старт");
	}
}

//------------------------------------------------------------------------------

function updateGeneration(generation) {
	// Обновляем счетчик количества поколений
	$("#generation-count").text(generation);
}

//------------------------------------------------------------------------------

function panelMessageClick() {
	// Закрываем панель сообщения
	$("#panel-message").css("display", "none");
}

//------------------------------------------------------------------------------

function startPauseClick() {
	// Кнопка старта или паузы игры
	setPlayStatus(!universe.isPlay);
	if (universe.isPlay) startGame();
}

//------------------------------------------------------------------------------

function setOptionsClick() {
	// Кнопка изменения настроек игры
	options = loadOptions();
	scope = new Visualization(options);
	clearClick();
}

//------------------------------------------------------------------------------

function clearClick() {
	// Кнопка остановки и очистки поля
	setPlayStatus(false);
	universe.life = scope.repaintArea(universe.life, {}, universe.keyToCoordinates);
	universe = new Universe(options.width, options.height);
	updateGeneration(universe.generationCount);
}

//------------------------------------------------------------------------------

function clearGenerationsClick() {
	// Сбрасывает счетчик количества поколений
	universe.generationCount = 0;
	updateGeneration(universe.generationCount);
}

//------------------------------------------------------------------------------

$("#figures-group :input").change(function() {
	// Обработчик кнопок выбора фигур
	if (scope.lastMouseX >= 0 && scope.lastMouseY >=0) {
		scope.drawCellGrid(scope.lastMouseX, scope.lastMouseY, scope.currentSquare, options.gridColor);
	}

	scope.currentSquare = parseInt($(this).val(), 10);

	if (scope.lastMouseX >= 0 && scope.lastMouseY >=0) {
		scope.drawCellGrid(scope.lastMouseX, scope.lastMouseY, scope.currentSquare, options.gridMoveColor);
	}
});

//------------------------------------------------------------------------------

$("#game-area").mousedown(function(event) {
	// По нажатию мыши добавляем или убираем жизнь на поле
	let cell = scope.positionToCoordinates(event, $("#game-area").offset());

	if (cell.intoArea) {
		scope.drawFigures(cell.x, cell.y, universe.getLife.bind(universe), universe.setLife.bind(universe));
	}
});

//------------------------------------------------------------------------------

$("#game-area").mousemove(function(event) {
	// Обработка подсказки расположения элемента
	if (options.gridWidth < 1) return;

	let cell = scope.positionToCoordinates(event, $("#game-area").offset());

	if (cell.intoArea  && (cell.x != scope.lastMouseX || cell.y != scope.lastMouseY)) {

		scope.drawCellGrid(scope.lastMouseX, scope.lastMouseY, scope.currentSquare, options.gridColor);
		scope.drawCellGrid(cell.x, cell.y, scope.currentSquare, options.gridMoveColor);

		if (event.which == 1 && scope.currentSquare == 0) {
			scope.drawFigures(cell.x, cell.y, universe.getLife.bind(universe), universe.setLife.bind(universe));
		}

		scope.lastMouseX = cell.x;
		scope.lastMouseY = cell.y;
	}
});

//------------------------------------------------------------------------------

$("#game-area").mouseleave(function(event) {
	// Удаляем подсказку расположения элемента
	if (options.gridWidth < 1) return;

	scope.drawCellGrid(scope.lastMouseX, scope.lastMouseY, scope.currentSquare, options.gridColor);

	scope.lastMouseX = -1;
	scope.lastMouseY = -1;
});

//------------------------------------------------------------------------------
