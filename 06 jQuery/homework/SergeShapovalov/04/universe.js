"use strict";

class Universe {

	constructor(width, height) {
		// Инициализация объекта
		Universe.delimiter = "_";

		function checkParam(param) {
			if (isNaN(param) || param < 1 || param % 1 != 0) {
				throw new TypeError("Передаваемые конструктору параметры должны быть положительным целым числом");
			}
			return param;
		}

		this.width = checkParam(width);
		this.height = checkParam(height);

		this.life = {};
	}

	//----------------------------------------------------------------------------

	posToIndex(X, Y) {
		// Получаем имя свойства из координат
		return String(X) + Universe.delimiter + String(Y);
	}

	//----------------------------------------------------------------------------

	indexToPos(index) {
		// Получаем координаты из имени свойства
		let arrPos = index.split(Universe.delimiter);
		let result = {
			X: arrPos[0],
			Y: arrPos[1]
		}
		return result;
	}

	//----------------------------------------------------------------------------

	getValue(X, Y) {
		// Получение значения. Для оптимизации хранения больших массивов данных
		return (this.posToIndex(X, Y) in this.life)
	}

	//----------------------------------------------------------------------------

	setValue(X, Y, value) {
		// Изменение значения. Для оптимизации хранения больших массивов данных
		if (value) {
			this.life[this.posToIndex(X, Y)] = null;
		} else {
			delete this.life[this.posToIndex(X, Y)];
		}
	}

	//----------------------------------------------------------------------------

	lifeAroundCell(posX, posY) {
		// Проверка жизни вокруг ячейки
		const OFFSET = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
		let countLives = 0;

		for (let i = 0; i < OFFSET.length; i++) {
			let shiftX = posX - OFFSET[i][0];
			let shiftY = posY - OFFSET[i][1];
			if (shiftX >=0 && shiftX < this.width && shiftY >= 0 && shiftY < this.height) {
				countLives += this.getValue(shiftX, shiftY);
			}
		}

		return countLives == 3 || (countLives == 2 ? this.getValue(posX, posY) : false);
	}

	//----------------------------------------------------------------------------

	tickLife() {
		// Смена одного поколения жизни
		const OFFSET = [[0, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];

		let nextLife = {};
		let lifeIsDifferent = 0;

		for (let index in this.life) {

			let pos = this.indexToPos(index);

			for (let i = 0; i < OFFSET.length; i++) {
				let shiftX = pos.X - OFFSET[i][0];
				let shiftY = pos.Y - OFFSET[i][1];

				if (!(this.posToIndex(shiftX, shiftY) in nextLife)) {

					let isAlive = this.lifeAroundCell(shiftX, shiftY);
					nextLife[this.posToIndex(shiftX, shiftY)] = isAlive;
					lifeIsDifferent += this.getValue(shiftX, shiftY) != isAlive;
				}
			}
		}

		let areaNotClear = 0;

		for (let index in nextLife) {
			if (nextLife[index]) {
				nextLife[index] = null;
				areaNotClear ++;
			} else {
				delete nextLife[index];
			}
		}

		let result = {
			nextLife,
			areaNotClear,
			lifeIsDifferent
		}

		return result;
	}

}
