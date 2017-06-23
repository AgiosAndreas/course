"use strict";

class Visualization {

	constructor(options) {
		// Установка настроек и инициализации программы
		this.gameArea = document.getElementById("game-area");
		this.ctx = this.gameArea.getContext("2d");
		this.imageBlock = document.createElement("canvas");

		$.extend(this, options);

		this.halfGridWidth = this.gridWidth / 2;
		this.blockRealSize = this.blockSize + this.blockPadding * 2 + this.gridWidth;

		this.gameArea.width = this.areaWidth * this.blockRealSize + this.gridWidth;
		this.gameArea.height = this.areaHeight * this.blockRealSize + this.gridWidth;

		this.drawImageBlock();

		if (this.gridWidth >= 1) {
			this.drawGrid();
		}
	}

	//----------------------------------------------------------------------------

	drawGrid() {
		// Рисуем сетку

		function drawLine(canvas, startX, startY, endX, endY) {
			// Рисуем линию от координат StartX, StartY до EndX, EndY
			canvas.beginPath();
			canvas.moveTo(startX, startY);
			canvas.lineTo(endX, endY);
			canvas.stroke();
		}

		this.ctx.lineWidth = this.gridWidth;
		this.ctx.strokeStyle = this.gridColor;

		for (let i = 0; i <= this.areaWidth; i++) {
			let posX = i * this.blockRealSize + this.halfGridWidth;
			drawLine(this.ctx, posX, 0, posX, this.gameArea.height);
		}

		for (let i = 0; i <= this.areaHeight; i++) {
			let posY = i * this.blockRealSize + this.halfGridWidth;
			drawLine(this.ctx, 0, posY, this.gameArea.width, posY);
		}
	}

	//----------------------------------------------------------------------------

	drawImageBlock() {
		// Предварительный рендеринг отрисовки блока
		const bSize = this.blockSize;
		const radius = bSize / 5 | 0;

		let img = this.imageBlock.getContext("2d");
		let gradient = img.createLinearGradient(0, 0, bSize, bSize);

		gradient.addColorStop(0, "#f00");
		gradient.addColorStop(0.5, "#00f");
		gradient.addColorStop(1, "#f0f");

		this.imageBlock.width = bSize;
		this.imageBlock.height = bSize;

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

	repaintArea(objectUniverse) {
		// Перерисовываем канву согласно данным в массиве объекта
		for (let i = 0; i < this.areaWidth; i++) {
			for (let j = 0; j < this.areaHeight; j++) {
				this.drawBlock(i, j, objectUniverse.getValue(i, j));
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

}
