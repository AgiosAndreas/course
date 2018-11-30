"use strict";
const assert = require('assert');
const Decoder = require("../decoder.js");

describe("Decoder", () => {
	
	function createDecoder(abc, letterSpace, wordSpace) {
		
		return new Decoder(abc, letterSpace, wordSpace);
	}

	function contractTest(decoder) {

		it(`#decode('') return empty string`, () => {
			assert.equal(decoder.decode(''), '');
		});

		it(`#decode('null') return empty string`, () => {
			assert.equal(decoder.decode(null), '');
		});

		it(`if #decode() cant find word return empty string`, () => {
			assert.equal(decoder.decode('. - - - -   - - - - - -  . - ---'), '');
		});
	}

	describe("#decode()", () => {

		const ABC = require('../abc/alphabet.json');
		const SPLIT_LETTER = "   ";
		const SPLIT_WORD = "       ";
		const MORSE_CODES = [{
			code:'. . . .   .   . - . .   . - - .   . . - - . .',
			word:'HELP?'
		},
		{
			code:'. . .   - - -   . . .',
			word:'SOS'
		},
		{
			code:'. . . .   .   . - . .   . - . .   - - -       . - -   - - -   . - .   . - . .   - . .   - - . . - -',
			word:'HELLO WORLD!'
		}];
	
		let decoder = createDecoder(ABC, SPLIT_LETTER, SPLIT_WORD);

		contractTest(decoder);

		for (let i = 0; i < MORSE_CODES.length; i++) {

			let code = MORSE_CODES[i].code;
			let result = MORSE_CODES[i].word;

			it (`decode ${result}`, () => {
				assert.equal(decoder.decode(code), result);
			})
		}
	})

	describe("#decode(RUSSIAN)", () => {

		const ABC_RU = require('../abc/alphabetRU.json');
		const SPLIT_LETTER_RU = "  ";
		const SPLIT_WORD_RU = "    ";
		const MORSE_CODES_RU = [{
			code:'. - - .  . - .  . .  . - -  .  -    - -  . .  . - .  - - . . - -',
			word:'ПРИВЕТ МИР!'
		},
		{
			code:'. - - - - .  . - . -  . - . - . -    . - -  . -  . . .  . - . -  . . . . . .  . - - - - .',
			word:"'Я, ВАСЯ.'"
		}]

		let decoder = createDecoder(ABC_RU, SPLIT_LETTER_RU, SPLIT_WORD_RU);

		contractTest(decoder);

		for (let i = 0; i < MORSE_CODES_RU.length; i++) {

			let code = MORSE_CODES_RU[i].code;
			let result = MORSE_CODES_RU[i].word;

			it (`decode ${MORSE_CODES_RU[i].word}`, () => {
				assert.equal(decoder.decode(code), result);
			})
		}
	})
});