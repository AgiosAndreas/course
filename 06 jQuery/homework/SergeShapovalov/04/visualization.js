"use strict";

class Visualization {

	constructor(options) {
		// Загрузка передаваемых параметров
		this.width = this.checkParam(options, "width", true);
		this.height = this.checkParam(options, "height", true);
		this.blockSize = this.checkParam(options, "blockSize", true);
		this.blockPadding = this.checkParam(options, "blockPadding", true);
		this.gridWidth = this.checkParam(options, "gridWidth", true);
		this.gridColor = this.checkParam(options, "gridColor", false);
		this.canvas = this.checkParam(options, "canvas", false);

		// Инициализация внутренних переменных объекта
		this.lastMouseX = -1;
		this.lastMouseY = -1;
		this.currentSquare = 0;

		this.gameArea = options.canvas;
		this.ctx = this.gameArea.getContext("2d");

		this.halfGridWidth = this.gridWidth / 2;
		this.blockRealSize = this.blockSize + this.blockPadding * 2 + this.gridWidth;

		this.gameArea.width = this.width * this.blockRealSize + this.gridWidth;
		this.gameArea.height = this.height * this.blockRealSize + this.gridWidth;

		this.drawImageBlock();

		if (this.gridWidth >= 1) this.drawGrid();
	}

	//----------------------------------------------------------------------------

	checkParam(objectParams, param, isNumber) {

		if (!(param in objectParams)) {
			throw new TypeError("Свойство " + param + " должно существовать в объекте передаваемых опций");
		}

		let value = objectParams[param];
		if (isNumber && (isNaN(value) || value < 0 || value % 1 != 0)) {
			throw new TypeError("Параметр " + param + " должнен быть положительным целым числом");
		}

		return value;
	}

	//----------------------------------------------------------------------------

	drawImageBlock() {
		// Предварительный рендеринг отрисовки блока
		const B_SIZE = this.blockSize;
		const RADIUS = B_SIZE / 5 | 0;

		this.imageBlock = document.createElement("canvas");
		let img = this.imageBlock.getContext("2d");
		let gradient = img.createLinearGradient(0, 0, B_SIZE, B_SIZE);

		gradient.addColorStop(0, "#f00");
		gradient.addColorStop(0.5, "#00f");
		gradient.addColorStop(1, "#f0f");

		this.imageBlock.width = B_SIZE;
		this.imageBlock.height = B_SIZE;

		img.beginPath();
		img.moveTo(RADIUS, 0);
		img.lineTo(B_SIZE - RADIUS, 0);
		img.quadraticCurveTo(B_SIZE, 0, B_SIZE, RADIUS);
		img.lineTo(B_SIZE, B_SIZE - RADIUS);
		img.quadraticCurveTo(B_SIZE, B_SIZE, B_SIZE - RADIUS, B_SIZE);
		img.lineTo(RADIUS, B_SIZE);
		img.quadraticCurveTo(0, B_SIZE, 0, B_SIZE - RADIUS);
		img.lineTo(0, RADIUS);
		img.quadraticCurveTo(0, 0, RADIUS, 0);
		img.fillStyle = gradient;
		img.fill();
	}

	//----------------------------------------------------------------------------

	drawGrid() {
		// Рисуем сетку
		this.ctx.lineWidth = this.gridWidth;
		this.ctx.strokeStyle = this.gridColor;

		for (let i = 0; i <= this.width; i++) {
			let posX = i * this.blockRealSize + this.halfGridWidth;
			this.drawLine(this.ctx, posX, 0, posX, this.gameArea.height);
		}

		for (let i = 0; i <= this.height; i++) {
			let posY = i * this.blockRealSize + this.halfGridWidth;
			this.drawLine(this.ctx, 0, posY, this.gameArea.width, posY);
		}
	}

	//----------------------------------------------------------------------------

	drawLine(canvas, startX, startY, endX, endY) {
		// Рисуем линию от координат StartX, StartY до EndX, EndY
		canvas.beginPath();
		canvas.moveTo(startX, startY);
		canvas.lineTo(endX, endY);
		canvas.stroke();
	}

	//----------------------------------------------------------------------------

	repaintArea(oldLife, newLife, functionObjectName) {
		// Перерисовываем канву согласно новым данным
		for (let key in oldLife) {
			if (key in newLife) continue;
			let pos = functionObjectName(key);
			this.drawBlock(pos.x, pos.y, false);
		}

		for (let key in newLife) {
			if (key in oldLife) continue;
			let pos = functionObjectName(key);
			this.drawBlock(pos.x, pos.y, true);
		}

		return newLife;
	}

	//----------------------------------------------------------------------------

	drawFigures(x, y, funcGetLife, funcSetLife) {
		// Наносим на поле выбранную фигуру
		if (this.currentSquare == 0) {
			let currentCell = !funcGetLife(x, y);
			funcSetLife(x, y, currentCell);
			this.drawBlock(x, y, currentCell);
			return;
		}

		let squareSize = this.getFigureSize(this.currentSquare);

		for (let i = 0; i < squareSize; i++) {
			for (let j = 0; j < squareSize; j++) {

				let shiftX = x + i;
				let shiftY = y + j;
				let current = funcGetLife(shiftX, shiftY);
				let put = this.getFigureData(i, j, this.currentSquare);
				let currentCell = (current && !put) || (!current && put);

				funcSetLife(shiftX, shiftY, currentCell);
				this.drawBlock(shiftX, shiftY, currentCell);
			}
		}
	}

	//----------------------------------------------------------------------------

	drawBlock(posX, posY, erase) {
		// Рисуем клетку жизни, где координаты posX, posY - это ячейки клетки
		let realX = posX * this.blockRealSize + this.gridWidth + this.blockPadding;
		let realY = posY * this.blockRealSize + this.gridWidth + this.blockPadding;

		if (erase) {
			this.ctx.drawImage(this.imageBlock, realX, realY);
		} else {
			this.ctx.clearRect(realX, realY, this.blockSize, this.blockSize);
		}
	}

	//----------------------------------------------------------------------------

	positionToCoordinates(event, canvasPos) {
		// Возвращает позицию блока в массиве относительно реальных координат
		let result = {
			x: ((event.pageX - canvasPos.left - this.halfGridWidth) / this.blockRealSize) | 0,
			y: ((event.pageY - canvasPos.top - this.halfGridWidth) / this.blockRealSize) | 0
		}
		result.intoArea = result.x >= 0 && result.x < this.width && result.y >= 0 && result.y < this.height;
		return result;
	}

	//----------------------------------------------------------------------------

	drawCellGrid(x, y, square, color) {
		// Рисуем или затираем ячейку подсказки
		let realX = x * this.blockRealSize + this.halfGridWidth;
		let realY = y * this.blockRealSize + this.halfGridWidth;
		let resultSquare = this.blockRealSize * this.getFigureSize(square);

		this.ctx.strokeStyle = color;
		this.ctx.strokeRect(realX, realY, resultSquare, resultSquare);
	}

	//----------------------------------------------------------------------------

	getFigureSize(square) {
		// Определяем размер фигуры
		return [1, 3, 8, 13][square];
	}

	//----------------------------------------------------------------------------

	getFigureData(x, y, square) {
		const GLIDER = [[0, 1, 0], [0, 0, 1], [1, 1, 1]];
		const CROSS = [
			[0, 0, 1, 1, 1, 1, 0, 0],
			[0, 0, 1, 0, 0, 1, 0, 0],
			[1, 1, 1, 0, 0, 1, 1, 1],
			[1, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 1],
			[1, 1, 1, 0, 0, 1, 1, 1],
			[0, 0, 1, 0, 0, 1, 0, 0],
			[0, 0, 1, 1, 1, 1, 0, 0]
		]
		const APIARY = [
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
			case 1: return GLIDER[y][x];
			case 2: return CROSS[y][x];
			case 3: return APIARY[y][x];
			default: return 1;
		}
	}

}
