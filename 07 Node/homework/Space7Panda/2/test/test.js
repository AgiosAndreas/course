"use strict";
const assert = require('assert');
const Decoder = require("../decoder.js");

let abc = require('../abc/alphabet.json');
let split_letter = "   ";
let split_word = "       ";

let abc_RU = require('../abc/alphabetRU.json');
let split_letter_RU = "  ";
let split_word_RU = "    ";

let morse = new Decoder(abc, split_letter, split_word);
let morseRU = new Decoder(abc_RU, split_letter_RU, split_word_RU);

describe("Decoder", function() {
	describe("morse.decode", function() {

		it("morse.decode('') return empty string", function() {
			assert.equal(morse.decode(''), '');
		});

		it("morse.decode(null) return empty string", function() {
			assert.equal(morse.decode(null), '');
		});

		it("morse.decode('. - - - -   - - - - - -  . - ---')) return empty string", function() {
			assert.equal(morse.decode('. - - - -   - - - - - -  . - ---'), '');
		});

		it("morse.decode('. . . .   .   . - . .   . - - .   . . - - . .') return 'HELP?'", function() {
			assert.equal(morse.decode('. . . .   .   . - . .   . - - .   . . - - . .'), 'HELP?');
		});

		it("morse.decode('. . .   - - -   . . .') return 'SOS'", function() {
			assert.equal(morse.decode('. . .   - - -   . . .'), 'SOS');
		});

		it("morse.decode('. . . .   .   . - . .   . - . .   - - -       . - -   - - -   . - .   . - . .   - . .   - - . . - -') return 'HELLO WORLD!'", function() {
			assert.equal(morse.decode('. . . .   .   . - . .   . - . .   - - -       . - -   - - -   . - .   . - . .   - . .   - - . . - -'), 'HELLO WORLD!');
		});
	})

	describe("morseRU.decode", function() {
	
		it("morseRU.decode('') return empty string", function() {
			assert.equal(morseRU.decode(''), '');
		});

		it("morseRU.decode(null) return empty string", function() {
			assert.equal(morseRU.decode(null), '');
		});
		it("morseRU.decode('. - - .  . - .  . .  . - -  .  -    - -  . .  . - .  - - . . - -') return 'ПРИВЕТ МИР!'", function() {
			assert.equal(morseRU.decode('. - - .  . - .  . .  . - -  .  -    - -  . .  . - .  - - . . - -'), 'ПРИВЕТ МИР!');
		});

		it("morseRU.decode('. - - - - .  . - . -  . - . - . -    . - -  . -  . . .  . - . -  . . . . . .  . - - - - .') return 'Я, ВАСЯ.'", function() {
			assert.equal(morseRU.decode('. - - - - .  . - . -  . - . - . -    . - -  . -  . . .  . - . -  . . . . . .  . - - - - .'), "'Я, ВАСЯ.'");
		});
	})
});