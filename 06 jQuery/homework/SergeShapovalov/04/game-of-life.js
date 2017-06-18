"use strict";

class GameLife {

	constructor(objectWidth, objectHeight) {

		// Константы класса
		GameLife.DICT_ARCHIVE = 36;
		GameLife.DICT_EXTRACT = 2;
		GameLife.CHUNK_SIZE = 16;

		// Переменные объекта
		this.width = objectWidth;
		this.height = objectHeight;
		this.chunkCount = Math.ceil(this.height / GameLife.CHUNK_SIZE);

		// Задаем пустой массив для хранения жизни
		this.array = [];
		for (let i = 0; i < this.width; i++) {
			this.array.push([]);
			for (let j = 0; j < this.chunkCount; j++) {
				this.array[i].push("0");
			}
		}
	}

	//----------------------------------------------------------------------------

	getValue(X, Y) {
		// Получение значения. Для оптимизации хранения больших массивов данных
		let posChunk = Math.floor(Y / GameLife.CHUNK_SIZE);
		let chunk = parseInt(this.array[X][posChunk], GameLife.DICT_ARCHIVE).toString(GameLife.DICT_EXTRACT);
		let posValue = Y % GameLife.CHUNK_SIZE;

		return posValue < chunk.length ? chunk[chunk.length - posValue - 1] == "1" : false;
	}

	//----------------------------------------------------------------------------

	setValue(X, Y, value) {
		// Изменение значения. Для оптимизации хранения больших массивов данных
		let posChunk = Math.floor(Y / GameLife.CHUNK_SIZE);
		let chunk = parseInt(this.array[X][posChunk], GameLife.DICT_ARCHIVE).toString(GameLife.DICT_EXTRACT);
		let posValue = Y % GameLife.CHUNK_SIZE;

		let diffPos = posValue - chunk.length + 1;
		for (let i = 0; i < diffPos; i++) {
			chunk = "0" + chunk;
		}

		function replaceCharAt(str, pos, char) {
			return str.substring(0, pos) + char + str.substring(pos + 1);
		}

		chunk = replaceCharAt(chunk, chunk.length - posValue - 1, value ? "1" : "0");
		this.array[X][posChunk] = parseInt(chunk, GameLife.DICT_EXTRACT).toString(GameLife.DICT_ARCHIVE);
	}

	//----------------------------------------------------------------------------

	tickLife() {
		// Смена одного поколения жизни

		function lifeAroundCell(object, posX, posY) {
			// Проверка жизни вокруг ячейки
			const OFFSET = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
			let countLives = 0;

			for (let i = 0; i < OFFSET.length; i++) {
				let shiftX = posX - OFFSET[i][0];
				let shiftY = posY - OFFSET[i][1];
				if (shiftX >=0 && shiftX < object.width && shiftY >= 0 && shiftY < object.height) {
					countLives += object.getValue(shiftX, shiftY);
				}
			}

			return countLives == 3 || (countLives == 2 ? object.getValue(posX, posY) : false);
		}

		let arrayNextLife = [];
		let areaNotClear = 0;
		let arraysAreSame = 0;

		for (let i = 0; i < this.width; i++) {
			arrayNextLife.push([]);
			for (let j = 0; j < this.chunkCount; j++) {
				let chunk = "";
				for (let k = 0; k < GameLife.CHUNK_SIZE; k++) {

					let posY = j * GameLife.CHUNK_SIZE + k;
					let isAlive = lifeAroundCell(this, i, posY);
					areaNotClear += isAlive;
					arraysAreSame += this.getValue(i, posY) != isAlive;

					chunk = (isAlive ? "1" : "0") + chunk;
				}
				arrayNextLife[i].push(parseInt(chunk, GameLife.DICT_EXTRACT).toString(GameLife.DICT_ARCHIVE));
			}
		}

		this.array = arrayNextLife;

		let result = 0;
		if (!areaNotClear) {
			result = 1;
		} else if (!arraysAreSame) {
			result = 2;
		}

		return result;
	}

}  // class GameLife

//------------------------------------------------------------------------------

class Visualization {

	constructor(options) {
		// Установка настроек и инициализации программы

		function drawImageBlock(object) {
			// Предварительный рендеринг отрисовки блока
			const bSize = object.blockSize;
			const radius = bSize / 5 | 0;

			let img = object.imageBlock.getContext("2d");
			let gradient = img.createLinearGradient(0, 0, bSize, bSize);

			gradient.addColorStop(0, "#f00");
			gradient.addColorStop(0.5, "#00f");
			gradient.addColorStop(1, "#f0f");

			object.imageBlock.width = bSize;
			object.imageBlock.height = bSize;

			img.beginPath();
			img.moveTo(radius, 0);
			img.lineTo(bSize - radius, 0);
			img.quadraticCurveTo(bSize, 0, bSize, radius);
			img.lineTo(bSize, bSize - radius);
			img.quadraticCurveTo(bSize, bSize, bSize - radius, bSize);
			img.lineTo(radius, bSize);
			img.quadraticCurveTo(0, bSize, 0, bSize - radius);
			img.lineTo(0, radius);
			img.quadraticCurveTo(0, 0, radius, 0);
			img.fillStyle = gradient;
			img.fill();
		}

		//--------------------------------------------------------------------------

		function drawGrid(object) {
			// Рисуем сетку

			function drawLine(StartX, StartY, EndX, EndY) {
				// Рисуем линию от координат StartX, StartY до EndX, EndY
				object.ctx.beginPath();
				object.ctx.moveTo(StartX, StartY);
				object.ctx.lineTo(EndX, EndY);
				object.ctx.stroke();
			}

			object.ctx.lineWidth = object.gridWidth;
			object.ctx.strokeStyle = object.gridColor;

			for (let i = 0; i <= object.areaWidth; i++) {
				let posX = i * object.blockRealSize + object.halfGridWidth;
				drawLine(posX, 0, posX, object.gameArea.height);
			}

			for (let i = 0; i <= object.areaHeight; i++) {
				let posY = i * object.blockRealSize + object.halfGridWidth;
				drawLine(0, posY, object.gameArea.width, posY);
			}
		}

		//--------------------------------------------------------------------------

		// Задаем переменные класса
		this.gameArea = document.getElementById("game-area");
		this.ctx = this.gameArea.getContext("2d");
		this.imageBlock = document.createElement("canvas");

		$.extend(this, options);

		this.halfGridWidth = this.gridWidth / 2;
		this.blockRealSize = this.blockSize + this.blockPadding * 2 + this.gridWidth;

		this.gameArea.width = this.areaWidth * this.blockRealSize + this.gridWidth;
		this.gameArea.height = this.areaHeight * this.blockRealSize + this.gridWidth;

		drawImageBlock(this);

		if (this.gridWidth >= 1) {
			drawGrid(this);
		}
	}

	//----------------------------------------------------------------------------

	drawBlock(posX, posY, drawErase) {
		// Рисуем клетку жизни, где координаты posX, posY - это ячейки клетки
		let realX = posX * this.blockRealSize + this.gridWidth + this.blockPadding;
		let realY = posY * this.blockRealSize + this.gridWidth + this.blockPadding;

		if (drawErase) {
			this.ctx.drawImage(this.imageBlock, realX, realY);
		} else {
			this.ctx.clearRect(realX, realY, this.blockSize, this.blockSize);
		}
	}

	//----------------------------------------------------------------------------

	repaintArea(object) {
		// Перерисовываем канву согласно данным в массиве объекта
		for (let i = 0; i < this.areaWidth; i++) {
			for (let j = 0; j < this.areaHeight; j++) {
				this.drawBlock(i, j, object.getValue(i, j));
			}
		}
	}

	//----------------------------------------------------------------------------

	getPosToCell(event, canvasPos) {
		// Возвращает позицию блока в массиве относительно реальных координат
		let result = {
			X: ((event.pageX - canvasPos.left - this.halfGridWidth) / this.blockRealSize) | 0,
			Y: ((event.pageY - canvasPos.top - this.halfGridWidth) / this.blockRealSize) | 0
		}
		result.intoArea = result.X >= 0 && result.X < this.areaWidth && result.Y >= 0 && result.Y < this.areaHeight;
		return result;
	}

	//----------------------------------------------------------------------------

	getFigureSize(square) {
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

	drawCellGrid(cellX, cellY, color) {
		// Рисуем или затираем ячейку подсказки
		let realX = cellX * this.blockRealSize + this.halfGridWidth;
		let realY = cellY * this.blockRealSize + this.halfGridWidth;
		let resultSquare = this.blockRealSize * this.getFigureSize(currentSquare);

		this.ctx.strokeStyle = color;
		this.ctx.strokeRect(realX, realY, resultSquare, resultSquare);
	}

	//------------------------------------------------------------------------------

	drawFigures(object, cellX, cellY) {
		// Наносим на поле выбранную фигуру
		if (currentSquare == 0) {
			let currentCell = !object.getValue(cellX, cellY);
			object.setValue(cellX, cellY, currentCell);
			this.drawBlock(cellX, cellY, currentCell);
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

		let squareSize = this.getFigureSize(currentSquare);

		for (let i = 0; i < squareSize; i++) {
			for (let j = 0; j < squareSize; j++) {
				let shiftX = cellX + i;
				let shiftY = cellY + j;
				let currentCell = xor(object.getValue(shiftX, shiftY), getFigureData(i, j, currentSquare));

				object.setValue(shiftX, shiftY, currentCell);
				this.drawBlock(shiftX, shiftY, currentCell);
			}
		}
	}

} // class Visualization

//------------------------------------------------------------------------------

let isPlay = false;
let generationCount = 0;

let lastMouseX = -1;
let lastMouseY = -1;
let currentSquare = 0;

let options = loadOptions();
let arrayLife = new GameLife(options.areaWidth, options.areaHeight);
let canvas = new Visualization(options);

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

			let resultTick = arrayLife.tickLife();
			canvas.repaintArea(arrayLife);

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
	canvas = new Visualization(options);
	clearClick();
}

//------------------------------------------------------------------------------

function clearClick() {
	// Кнопка остановки и очистки поля
	setPlayStatus(false);
	arrayLife = new GameLife(options.areaWidth, options.areaHeight);
	canvas.repaintArea(arrayLife);
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
		canvas.drawCellGrid(lastMouseX, lastMouseY, options.gridColor);
	}

	currentSquare = parseInt($(this).val(), 10);

	if (lastMouseX >= 0 && lastMouseY >=0) {
		caonvas.drawCellGrid(lastMouseX, lastMouseY, options.gridMoveColor);
	}
});

//------------------------------------------------------------------------------

$("#game-area").mousedown(function(event) {
	// По нажатию мыши добавляем или убираем жизнь на поле
	let cell = canvas.getPosToCell(event, $("#game-area").offset());

	if (cell.intoArea) {
		canvas.drawFigures(arrayLife, cell.X,cell.Y);
	}
});

//------------------------------------------------------------------------------

$("#game-area").mousemove(function(event) {
	// Обработка подсказки расположения элемента
	if (options.gridWidth < 1) {
		return;
	}

	let cell = canvas.getPosToCell(event, $("#game-area").offset());

	if (cell.intoArea  && (cell.X != lastMouseX || cell.Y != lastMouseY)) {

		canvas.drawCellGrid(lastMouseX, lastMouseY, options.gridColor);
		canvas.drawCellGrid(cell.X, cell.Y, options.gridMoveColor);

		if (event.which == 1 && currentSquare == 0) {
			canvas.drawFigures(arrayLife, cell.X,cell.Y);
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

	canvas.drawCellGrid(lastMouseX, lastMouseY, options.gridColor);

	lastMouseX = -1;
	lastMouseY = -1;
});

//------------------------------------------------------------------------------
