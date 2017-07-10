"use strict";

class Universe {

	constructor(width, height) {
		// Инициализация объекта
		Universe.DELIMITER = "_";

		this.width = this.checkParam(width);
		this.height = this.checkParam(height);

		this.generationCount = 0;
		this.isPlay = false;

		this.life = {};
	}

	//----------------------------------------------------------------------------

	checkParam(param) {
		if (isNaN(param) || param < 1 || param % 1 != 0) {
			throw new TypeError("Передаваемые конструктору параметры должны быть положительным целым числом");
		}
		return param;
	}

	//----------------------------------------------------------------------------

	tickLife() {
		// Смена одного поколения жизни
		let nextLife = {};
		let countDifferents = 0;
		let offset = this.offsetPositions(true);

		for (let key in this.life) {

			let pos = this.keyToCoordinates(key);

			for (let i = 0; i < offset.length; i++) {
				let shiftX = pos.x - offset[i][0];
				let shiftY = pos.y - offset[i][1];

				if (this.coordinatesToKey(shiftX, shiftY) in nextLife) continue;

				let isAlive = this.lifeAroundCell(shiftX, shiftY);
				nextLife[this.coordinatesToKey(shiftX, shiftY)] = isAlive;
				countDifferents += this.getLife(shiftX, shiftY) != isAlive;
			}
		}

		let amountLives = 0;

		for (let key in nextLife) {
			if (nextLife[key]) {
				nextLife[key] = null;
				amountLives ++;
			} else {
				delete nextLife[key];
			}
		}

		this.isPlay = amountLives && countDifferents;
		if (this.isPlay) this.generationCount ++;

		let result = {
			nextLife,
			amountLives,
			countDifferents
		}

		return result;
	}

	//----------------------------------------------------------------------------

	lifeAroundCell(posX, posY) {
		// Проверка жизни вокруг ячейки
		let countLives = 0;
		let offset = this.offsetPositions(false);

		for (let i = 0; i < offset.length; i++) {
			let shiftX = posX - offset[i][0];
			let shiftY = posY - offset[i][1];
			if (shiftX >=0 && shiftX < this.width && shiftY >= 0 && shiftY < this.height) {
				countLives += this.getLife(shiftX, shiftY);
			}
		}

		return countLives == 3 || (countLives == 2 ? this.getLife(posX, posY) : false);
	}

	//----------------------------------------------------------------------------

	offsetPositions(self) {
		// Возвращает координаты соседних клеток
		let offset = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
		if (self) offset.unshift([0, 0]);
		return offset;
	}

	//----------------------------------------------------------------------------

	getLife(x, y) {
		// Получение значения. Для оптимизации хранения больших массивов данных
		return (this.coordinatesToKey(x, y) in this.life)
	}

	//----------------------------------------------------------------------------

	setLife(x, y, value) {
		// Изменение значения. Для оптимизации хранения больших массивов данных
		if (value) {
			this.life[this.coordinatesToKey(x, y)] = null;
		} else {
			delete this.life[this.coordinatesToKey(x, y)];
		}
	}

	//----------------------------------------------------------------------------

	coordinatesToKey(x, y) {
		// Получаем имя свойства из координат
		return String(x) + Universe.DELIMITER + String(y);
	}

	//----------------------------------------------------------------------------

	keyToCoordinates(key) {
		// Получаем координаты из имени свойства
		let arrPos = key.split(Universe.DELIMITER);
		let result = {
			x: arrPos[0],
			y: arrPos[1]
		}
		return result;
	}

}
