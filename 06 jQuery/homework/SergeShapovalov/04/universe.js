"use strict";

class Universe {

	constructor(width, height) {

		// Константы класса
		Universe.DICT_ARCHIVE = 36;
		Universe.DICT_EXTRACT = 2;
		Universe.CHUNK_SIZE = 16;

		// Переменные объекта
		this.width = width;
		this.height = height;
		this.chunkCount = Math.ceil(this.height / Universe.CHUNK_SIZE);

		// Задаем пустой массив для хранения жизни
		this.life = [];
		for (let i = 0; i < this.width; i++) {
			this.life.push([]);
			for (let j = 0; j < this.chunkCount; j++) {
				this.life[i].push("0");
			}
		}
	}

	//----------------------------------------------------------------------------

	getValue(X, Y) {
		// Получение значения. Для оптимизации хранения больших массивов данных
		let posChunk = Math.floor(Y / Universe.CHUNK_SIZE);
		let chunk = parseInt(this.life[X][posChunk], Universe.DICT_ARCHIVE).toString(Universe.DICT_EXTRACT);
		let posValue = Y % Universe.CHUNK_SIZE;

		return posValue < chunk.length ? chunk[chunk.length - posValue - 1] == "1" : false;
	}

	//----------------------------------------------------------------------------

	setValue(X, Y, value) {
		// Изменение значения. Для оптимизации хранения больших массивов данных
		let posChunk = Math.floor(Y / Universe.CHUNK_SIZE);
		let chunk = parseInt(this.life[X][posChunk], Universe.DICT_ARCHIVE).toString(Universe.DICT_EXTRACT);
		let posValue = Y % Universe.CHUNK_SIZE;

		let diffPos = posValue - chunk.length + 1;
		for (let i = 0; i < diffPos; i++) {
			chunk = "0" + chunk;
		}

		function replaceCharAt(str, pos, char) {
			return str.substring(0, pos) + char + str.substring(pos + 1);
		}

		chunk = replaceCharAt(chunk, chunk.length - posValue - 1, value ? "1" : "0");
		this.life[X][posChunk] = parseInt(chunk, Universe.DICT_EXTRACT).toString(Universe.DICT_ARCHIVE);
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

		let nextLife = [];
		let areaNotClear = 0;
		let lifesAreSame = 0;

		for (let i = 0; i < this.width; i++) {
			nextLife.push([]);
			for (let j = 0; j < this.chunkCount; j++) {
				let chunk = "";
				for (let k = 0; k < Universe.CHUNK_SIZE; k++) {

					let posY = j * Universe.CHUNK_SIZE + k;
					let isAlive = this.lifeAroundCell(i, posY);
					areaNotClear += isAlive;
					lifesAreSame += this.getValue(i, posY) != isAlive;

					chunk = (isAlive ? "1" : "0") + chunk;
				}
				nextLife[i].push(parseInt(chunk, Universe.DICT_EXTRACT).toString(Universe.DICT_ARCHIVE));
			}
		}

		this.life = nextLife;

		let result = 0;
		if (!areaNotClear) {
			result = 1;
		} else if (!lifesAreSame) {
			result = 2;
		}

		return result;
	}

}
