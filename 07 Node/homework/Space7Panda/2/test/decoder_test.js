"use strict";
const assert = require('assert');
const Decoder = require("../decoder.js");

describe("Decoder", function() {

	let abc = require('../abc/alphabet.json');
	let split_letter = "   ";
	let split_word = "       ";

	let abc_RU = require('../abc/alphabetRU.json');
	let split_letter_RU = "  ";
	let split_word_RU = "    ";

	let decoders = [
		new Decoder(abc, split_letter, split_word), 
		new Decoder(abc_RU, split_letter_RU, split_word_RU)
	];

	let morseCodes = [{
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

	let morseCodesRu = [{
		code:'. - - .  . - .  . .  . - -  .  -    - -  . .  . - .  - - . . - -',
		word:'ПРИВЕТ МИР!'
	},
	{
		code:'. - - - - .  . - . -  . - . - . -    . - -  . -  . . .  . - . -  . . . . . .  . - - - - .',
		word:"'Я, ВАСЯ.'"
	}]

	describe("contract test", function() {

		for (let i=0; i < decoders.length; i++) {

			it(`decoder[${[i]}].decode('') return empty string`, function() {
				assert.equal(decoders[i].decode(''), '');
			});

			it(`decoder[${[i]}].decode('null') return empty string`, function() {
				assert.equal(decoders[i].decode(null), '');
			});

			it(`decoder[${[i]}] if cant find word return empty string`, function() {
				assert.equal(decoders[i].decode('. - - - -   - - - - - -  . - ---'), '');
			});
		}
	})

	describe("morse decode", function() {

		for (let i = 0; i < morseCodes.length; i++) {

			it (`decode ${morseCodes[i].word}`, function() {
				assert.equal(decoders[0].decode(morseCodes[i].code), morseCodes[i].word);
			})

		}
		
	})

	describe("morseRU decode", function() {

		for (let i = 0; i < morseCodesRu.length; i++) {

			it (`decode ${morseCodesRu[i].word}`, function() {
				assert.equal(decoders[1].decode(morseCodesRu[i].code), morseCodesRu[i].word);
			})

		}
	})
});