"use strict";

const CHUNK_SIZE = 16;
const DICT_ARCHIVE = 36;
const DICT_EXTRACT = 2;

const GRID_COLOR = "#aaa";
const GRID_MOVE_COLOR = "#f00";

let areaWidth, areaHeight;
let chunkCount;
let blockSize, blockRealSize, blockPadding ;
let gridWidth, halfGridWidth;
let canvasWidth, canvasHeight;
let lifetime;

let arrayLife;
let arrayNextLife;

let isPlay;
let generationCount;

let lastMouseX = -1;
let lastMouseY = -1;
let currentSquare = 0;

let gameArea = document.getElementById("game-area");
let ctx = gameArea.getContext("2d");

let imageBlock = document.createElement("canvas");

initalizeOptions();

//------------------------------------------------------------------------------

function initalizeOptions() {
	// Установка настроек и инициализации программы

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

	areaWidth = getInputIntValue("input-width-area", 1, 10000, 40, "ширины поля");
	areaHeight = getInputIntValue("input-height-area", 1, 10000, 25, "высоты поля");
	blockSize = getInputIntValue("input-block-size", 1, 1000, 20, "размера блока");
	blockPadding = getInputIntValue("input-block-padding", 0, 100, 1, "отступа блока");
	gridWidth = getInputIntValue("input-grid-width", 0, 100, 1, "толщины сетки");
	lifetime = getInputIntValue("input-speed-animation", 10, 100000, 200, "скорости анимации");

	halfGridWidth = gridWidth / 2;
	blockRealSize = blockSize + blockPadding * 2 + gridWidth;
	canvasWidth = areaWidth * blockRealSize + gridWidth;
	canvasHeight = areaHeight * blockRealSize + gridWidth;
	chunkCount = Math.ceil(areaHeight / CHUNK_SIZE);

	gameArea.width = canvasWidth;
	gameArea.height = canvasHeight;

	drawImageBlock();

	if (gridWidth >= 1) {
		drawGrid();
	}

	clearClick();
}

//------------------------------------------------------------------------------

function initalizeArray() {
	// Задаем пустой массив для хранения жизни
	let array = [];

	for (let i = 0; i < areaWidth; i++) {
		array.push([]);
		for (let j = 0; j < chunkCount; j++) {
			array[i].push("0");
		}
	}
	return array;
}

//------------------------------------------------------------------------------

function getArrayValue(X, Y) {
	// Получение значения. Для оптимизации хранения больших массивов данных
	let posChunk = Math.floor(Y / CHUNK_SIZE);
	let chunk = parseInt(arrayLife[X][posChunk], DICT_ARCHIVE).toString(DICT_EXTRACT);
	let posValue = Y % CHUNK_SIZE;

	return posValue < chunk.length ? chunk[chunk.length - posValue - 1] == "1" : false;
}

//------------------------------------------------------------------------------

function setArrayValue(X, Y, value) {
	// Изменение значения. Для оптимизации хранения больших массивов данных
	let posChunk = Math.floor(Y / CHUNK_SIZE);
	let chunk = parseInt(arrayLife[X][posChunk], DICT_ARCHIVE).toString(DICT_EXTRACT);
	let posValue = Y % CHUNK_SIZE;

	let diffPos = posValue - chunk.length + 1;
	for (let i = 0; i < diffPos; i++) {
		chunk = "0" + chunk;
	}

	function replaceCharAt(str, pos, char) {
		return str.substring(0, pos) + char + str.substring(pos + 1);
	}

	chunk = replaceCharAt(chunk, chunk.length - posValue - 1, value ? "1" : "0");
	arrayLife[X][posChunk] = parseInt(chunk, DICT_EXTRACT).toString(DICT_ARCHIVE);
}

//------------------------------------------------------------------------------

function setPlayStatus(play) {
	// Останавливаем или запускаем игру, обновляем статус кнопки
	isPlay = play;
	if (play) {
		document.getElementById("button-start").innerText = "Пауза";
	} else {
		document.getElementById("button-start").innerText = "Старт";
	}
}

//------------------------------------------------------------------------------

function drawImageBlock() {
	// Предварительный рендеринг отрисовки блока
	const radius = blockSize / 5 | 0;

	let img = imageBlock.getContext("2d");
	let gradient = img.createLinearGradient(0, 0, blockSize, blockSize);

	gradient.addColorStop(0, "#f00");
	gradient.addColorStop(0.5, "#00f");
	gradient.addColorStop(1, "#f0f");

	imageBlock.width = blockSize;
	imageBlock.height = blockSize;

	img.beginPath();
	img.moveTo(radius, 0);
	img.lineTo(blockSize - radius, 0);
	img.quadraticCurveTo(blockSize, 0, blockSize, radius);
	img.lineTo(blockSize, blockSize - radius);
	img.quadraticCurveTo(blockSize, blockSize, blockSize - radius, blockSize);
	img.lineTo(radius, blockSize);
	img.quadraticCurveTo(0, blockSize, 0, blockSize - radius);
	img.lineTo(0, radius);
	img.quadraticCurveTo(0, 0, radius, 0);
	img.fillStyle = gradient;
	img.fill();
}

//------------------------------------------------------------------------------

function drawGrid() {
	// Рисуем сетку

	function drawLine(StartX, StartY, EndX, EndY) {
		// Рисуем линию от координат StartX, StartY до EndX, EndY
		ctx.beginPath();
		ctx.moveTo(StartX, StartY);
		ctx.lineTo(EndX, EndY);
		ctx.stroke();
	}

	ctx.lineWidth = gridWidth;
	ctx.strokeStyle = GRID_COLOR;

	for (let i = 0; i <= areaWidth; i++) {
		let posX = i * blockRealSize + halfGridWidth;
		drawLine(posX, 0, posX, canvasHeight);
	}

	for (let i = 0; i <= areaHeight; i++) {
		let posY = i * blockRealSize + halfGridWidth;
		drawLine(0, posY, canvasWidth, posY);
	}
}

//------------------------------------------------------------------------------

function drawBlock(posX, posY, drawErase) {
	// Рисуем клетку жизни, где координаты posX, posY - это ячейки клетки
	let realX = posX * blockRealSize + gridWidth + blockPadding;
	let realY = posY * blockRealSize + gridWidth + blockPadding;

	if (drawErase) {
		ctx.drawImage(imageBlock, realX, realY);
	} else {
		ctx.clearRect(realX, realY, blockSize, blockSize);
	}
}

//------------------------------------------------------------------------------

function repaintArea() {
	// Перерисовываем канву согласно данным в массиве
	for (let i = 0; i < areaWidth; i++) {
		for (let j = 0; j < areaHeight; j++) {
			drawBlock(i, j, getArrayValue(i, j));
		}
	}
}

//------------------------------------------------------------------------------

function setGeneration(generation) {
	// Обновляем счетчик количества поколений
	document.getElementById("generation-count").innerText = generation;
}

//------------------------------------------------------------------------------

function tickLife() {
	// Смена одного поколения жизни

	function lifeAroundCell(posX, posY) {
		// Проверка жизни вокруг ячейки
		const OFFSET = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
		let countLives = 0;

		for (let i = 0; i < OFFSET.length; i++) {
			let shiftX = posX - OFFSET[i][0];
			let shiftY = posY - OFFSET[i][1];
			if (shiftX >=0 && shiftX < areaWidth && shiftY >= 0 && shiftY < areaHeight) {
				countLives += getArrayValue(shiftX, shiftY);
			}
		}

		return countLives == 3 || (countLives == 2 ? getArrayValue(posX, posY) : false);
	}

	let areaNotClear = 0;
	let arraysAreSame = 0;

	arrayNextLife = [];

	for (let i = 0; i < areaWidth; i++) {
		arrayNextLife.push([]);
		for (let j = 0; j < chunkCount; j++) {
			let chunk = "";
			for (let k = 0; k < CHUNK_SIZE; k++) {

				let posY = j * CHUNK_SIZE + k;
				let isAlive = lifeAroundCell(i, posY);
				areaNotClear += isAlive;
				arraysAreSame += getArrayValue(i, posY) != isAlive;

				chunk = (isAlive ? "1" : "0") + chunk;
			}
			arrayNextLife[i].push(parseInt(chunk, DICT_EXTRACT).toString(DICT_ARCHIVE));
		}
	}

	let result = 0;
	if (!areaNotClear) {
		result = 1;
	} else if (!arraysAreSame) {
		result = 2;
	}

	return result;
}

//------------------------------------------------------------------------------

function startGame() {
	// Запуск игры и обработка развития или завершения жизни

	let timer = setInterval(function() {
		if (isPlay) {

			let resultTick = tickLife();
			arrayLife = arrayNextLife;
			repaintArea();

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
	}, lifetime);
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
		startGame();
	}
}

//------------------------------------------------------------------------------

function clearClick() {
	// Кнопка остановки и очистки поля
	setPlayStatus(false);
	arrayLife = initalizeArray();
	repaintArea();
	clearGenerationsClick();
}

//------------------------------------------------------------------------------

function clearGenerationsClick() {
	// Сбрасывает счетчик количества поколений
	generationCount = 0;
	setGeneration(generationCount);
}

//------------------------------------------------------------------------------

function getPosToCell(event) {
	// Возвращает позицию блока в массиве относительно реальных координат
	let canvasPos = $("#game-area").offset();
	let result = {
		X: ((event.pageX - canvasPos.left - halfGridWidth) / blockRealSize) | 0,
		Y: ((event.pageY - canvasPos.top - halfGridWidth) / blockRealSize) | 0
	}
	result.intoArea = result.X >= 0 && result.X < areaWidth && result.Y >= 0 && result.Y < areaHeight;
	return result;
}

//------------------------------------------------------------------------------

function getFigureSize(square) {
	// Определяем размер фигуры
	let squareSize = 1;
	switch(square) {
		case 1:
			squareSize = 3;
			break;
		case 2:
			squareSize = 8;
			break;
		case 3:
			squareSize = 13;
			break;
	}
	return squareSize;
}

//------------------------------------------------------------------------------

function drawCellGrid(cellX, cellY, color) {
	// Рисуем или затираем ячейку подсказки
	let realX = cellX * blockRealSize + halfGridWidth;
	let realY = cellY * blockRealSize + halfGridWidth;
	let resultSquare = blockRealSize * getFigureSize(currentSquare);

	ctx.strokeStyle = color;
	ctx.strokeRect(realX, realY, resultSquare, resultSquare);
}

//------------------------------------------------------------------------------

function drawFigures(cellX, cellY) {
	// Наносим на поле выбранную фигуру
	if (currentSquare == 0) {
		let currentCell = !getArrayValue(cellX, cellY);
		setArrayValue(cellX, cellY, currentCell);
		drawBlock(cellX, cellY, currentCell);
		return;
	}

	function getFigureData(X, Y, square) {
		const glider = [[0, 1, 0], [0, 0, 1], [1, 1, 1]];
		const cross = [
			[0, 0, 1, 1, 1, 1, 0, 0],
			[0, 0, 1, 0, 0, 1, 0, 0],
			[1, 1, 1, 0, 0, 1, 1, 1],
			[1, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 1],
			[1, 1, 1, 0, 0, 1, 1, 1],
			[0, 0, 1, 0, 0, 1, 0, 0],
			[0, 0, 1, 1, 1, 1, 0, 0]
		]
		const apiary = [
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
			[1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
			[0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
		];

		switch(square) {
			case 1: return glider[Y][X];
			case 2: return cross[Y][X];
			case 3: return apiary[Y][X];
			default: return 1;
		}
	}

	function xor(a, b) {
		return (a && !b) || (!a && b);
	}

	let squareSize = getFigureSize(currentSquare);

	for (let i = 0; i < squareSize; i++) {
		for (let j = 0; j < squareSize; j++) {
			let shiftX = cellX + i;
			let shiftY = cellY + j;
			let currentCell = xor(getArrayValue(shiftX, shiftY), getFigureData(i, j, currentSquare));

			setArrayValue(shiftX, shiftY, currentCell);
			drawBlock(shiftX, shiftY, currentCell);
		}
	}
}

//------------------------------------------------------------------------------

$("#figures-group :input").change(function() {
	// Обработчик кнопок выбора фигур
	if (lastMouseX >= 0 && lastMouseY >=0) {
		drawCellGrid(lastMouseX, lastMouseY, GRID_COLOR);
	}

	currentSquare = parseInt($(this).val(), 10);

	if (lastMouseX >= 0 && lastMouseY >=0) {
		drawCellGrid(lastMouseX, lastMouseY, GRID_MOVE_COLOR);
	}
});

//------------------------------------------------------------------------------

$("#game-area").mousedown(function(event) {
	// По нажатию мыши добавляем или убираем жизнь на поле
	let cell = getPosToCell(event);

	if (cell.intoArea) {
		drawFigures(cell.X,cell.Y);
	}
});

//------------------------------------------------------------------------------

$("#game-area").mousemove(function(event) {
	// Обработка подсказки расположения элемента
	if (gridWidth < 1) {
		return;
	}

	let cell = getPosToCell(event);

	if (cell.intoArea  && (cell.X != lastMouseX || cell.Y != lastMouseY)) {

		drawCellGrid(lastMouseX, lastMouseY, GRID_COLOR);
		drawCellGrid(cell.X, cell.Y, GRID_MOVE_COLOR);

		if (event.which == 1 && currentSquare == 0) {
			drawFigures(cell.X,cell.Y);
		}

		lastMouseX = cell.X;
		lastMouseY = cell.Y;
	}
});

//------------------------------------------------------------------------------

$("#game-area").mouseleave(function(event) {
	// Удаляем подсказку расположения элемента
	if (gridWidth < 1) {
		return;
	}

	drawCellGrid(lastMouseX, lastMouseY, GRID_COLOR);

	lastMouseX = -1;
	lastMouseY = -1;
});

//------------------------------------------------------------------------------
