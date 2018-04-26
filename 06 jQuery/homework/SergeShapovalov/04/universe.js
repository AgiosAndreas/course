"use strict";

class Universe {

	constructor(width, height) {
		// Инициализация объекта
		Universe.DELIMITER = "_";

		this.width = this.checkParam(width);
		this.height = this.checkParam(height);

		this.generation = 0;
		this.countAlive = 0;
		this.countDifferents = 0;
		this.isPlay = false;
		this.isActive = false;

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

	next() {
		// Смена одного поколения жизни
		this.countDifferents = 0;
		this.countAlive = 0;

		let nextLife = {};
		let operate = this.operateCells(this.life, true);

		for (let key in operate) {

			let isAlive = this.lifeAroundCell(key);
			if (isAlive) {
				nextLife[key] = null;
				this.countAlive ++;
			}
			this.countDifferents += key in this.life != isAlive;
		}

		this.isPlay = this.countAlive && this.countDifferents;
		this.isActive = this.countDifferents != 0;
		if (this.isPlay) this.generation ++;

		this.life = nextLife;

		return nextLife;
	}

	//----------------------------------------------------------------------------

	lifeAroundCell(key) {
		// Проверка жизни вокруг ячейки
		let countAlive = 0;
		let operate = this.operateCells({[key]: null}, false);

		for (let key in operate) {
			countAlive += key in this.life;
		}

		return countAlive == 3 || (countAlive == 2 ? key in this.life : false);
	}

	//----------------------------------------------------------------------------

	operateCells(cells, self) {
		// Возвращает клетки, которые нужно обработать
		let operate = {};
		let offset = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
		if (self) offset.unshift([0, 0]);

		for (let key in cells) {

			let pos = this.keyToCoordinates(key);
			for (let i = 0; i < offset.length; i++) {

				let shiftX = pos.x - offset[i][0];
				let shiftY = pos.y - offset[i][1];

				if (shiftX < 0 || shiftX >= this.width || shiftY < 0 || shiftY >= this.height) continue;
				let cell = this.coordinatesToKey(shiftX, shiftY);
				if (cell in operate) continue;

				operate[cell] = null;
			}
		}
		return operate;
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
