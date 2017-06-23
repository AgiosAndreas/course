"use strict";

let isPlay = false;
let generationCount = 0;

let lastMouseX = -1;
let lastMouseY = -1;
let currentSquare = 0;

let options = loadOptions();
let universe = new Universe(options.areaWidth, options.areaHeight);
let scope = new Visualization(options);

//------------------------------------------------------------------------------

function loadOptions() {
	// Загружаем настройки игры

	function getInputIntValue(nameValue, min, max, defaultValue, errMessage) {
		// Получение корректного значения от пользователя
		let result = parseInt(document.getElementById(nameValue).value, 10);

		if (isNaN(result) || result < min || result > max) {
			result = defaultValue;
			document.getElementById(nameValue).value = defaultValue;
			showMessage("Изменение параметров",
				"Значение " + errMessage + " задано некорректно.\n" +
				"Параметр должен находиться в пределах от " + min + " до " + max + ".\n" +
				"Установлено значение по умолчанию, как " + defaultValue + ".");
		}

		return result;
	}

	//--------------------------------------------------------------------------

	let options = {
		areaWidth: getInputIntValue("input-width-area", 1, 10000, 40, "ширины поля"),
		areaHeight: getInputIntValue("input-height-area", 1, 10000, 25, "высоты поля"),
		blockSize: getInputIntValue("input-block-size", 1, 1000, 20, "размера блока"),
		blockPadding: getInputIntValue("input-block-padding", 0, 100, 1, "отступа блока"),
		gridWidth: getInputIntValue("input-grid-width", 0, 100, 1, "толщины сетки"),
		lifetime: getInputIntValue("input-speed-animation", 10, 100000, 200, "скорости анимации"),
		gridColor: "#aaa",
		gridMoveColor: "#f00"
	}

	return options;
}

//------------------------------------------------------------------------------

function setPlayStatus(play) {
	// Останавливаем или запускаем игру, обновляем статус кнопки
	isPlay = play;
	if (play) {
		$("#button-start").text("Пауза");
	} else {
		$("#button-start").text("Старт");
	}
}

//------------------------------------------------------------------------------

function setGeneration(generation) {
	// Обновляем счетчик количества поколений
	$("#generation-count").text(generation);
}

//------------------------------------------------------------------------------

function letGame() {
	// Обработчик таймера игры

	let timer = setInterval(function() {
		if (isPlay) {

			let resultTick = universe.tickLife();
			scope.repaintArea(universe);

			switch(resultTick) {
				case 1:
					showMessage("Игра окончена",
						"Жизнь погибла или не была добавлена на поле.\n" +
						"Пожалуйста, воспользуйтесь инструментами панели \"Редактирование\".");
					break;
				case 2:
					showMessage("Игра окончена",
						"Жизнь не развивается. Следующее поколение жизни полностью аналогично предыдущему.\n" +
						"Добавьте новую жизнь на поле или начните заново.");
					break;
				default:
					generationCount ++;
					setGeneration(generationCount)
			}
			if (resultTick) {
				setPlayStatus(false);
				clearInterval(timer);
			}

		} else {
			clearInterval(timer);
		}
	}, options.lifetime);
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

function panelMessageClick() {
	// Закрываем панель сообщения
	$("#panel-message").css("display", "none");
}

//------------------------------------------------------------------------------

function startPauseClick() {
	// Кнопка старта или паузы игры
	setPlayStatus(!isPlay);
	if (isPlay) {
		letGame();
	}
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
	universe = new Universe(options.areaWidth, options.areaHeight);
	scope.repaintArea(universe);
	clearGenerationsClick();
}

//------------------------------------------------------------------------------

function clearGenerationsClick() {
	// Сбрасывает счетчик количества поколений
	generationCount = 0;
	setGeneration(generationCount);
}

//------------------------------------------------------------------------------

$("#figures-group :input").change(function() {
	// Обработчик кнопок выбора фигур
	if (lastMouseX >= 0 && lastMouseY >=0) {
		scope.drawCellGrid(lastMouseX, lastMouseY, options.gridColor);
	}

	currentSquare = parseInt($(this).val(), 10);

	if (lastMouseX >= 0 && lastMouseY >=0) {
		scope.drawCellGrid(lastMouseX, lastMouseY, options.gridMoveColor);
	}
});

//------------------------------------------------------------------------------

$("#game-area").mousedown(function(event) {
	// По нажатию мыши добавляем или убираем жизнь на поле
	let cell = scope.getPosToCell(event, $("#game-area").offset());

	if (cell.intoArea) {
		scope.drawFigures(universe, cell.X,cell.Y);
	}
});

//------------------------------------------------------------------------------

$("#game-area").mousemove(function(event) {
	// Обработка подсказки расположения элемента
	if (options.gridWidth < 1) {
		return;
	}

	let cell = scope.getPosToCell(event, $("#game-area").offset());

	if (cell.intoArea  && (cell.X != lastMouseX || cell.Y != lastMouseY)) {

		scope.drawCellGrid(lastMouseX, lastMouseY, options.gridColor);
		scope.drawCellGrid(cell.X, cell.Y, options.gridMoveColor);

		if (event.which == 1 && currentSquare == 0) {
			scope.drawFigures(universe, cell.X,cell.Y);
		}

		lastMouseX = cell.X;
		lastMouseY = cell.Y;
	}
});

//------------------------------------------------------------------------------

$("#game-area").mouseleave(function(event) {
	// Удаляем подсказку расположения элемента
	if (options.gridWidth < 1) {
		return;
	}

	scope.drawCellGrid(lastMouseX, lastMouseY, options.gridColor);

	lastMouseX = -1;
	lastMouseY = -1;
});

//------------------------------------------------------------------------------
