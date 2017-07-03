"use strict";

(function( $ ) {
	$.fn.validatePhone = function(options, phoneChange) {

		let checkedParams = checkParams(arguments);
		options = checkedParams.options;
		phoneChange = checkedParams.phoneChange;

		let oldValue = "";

		this.on("input", function(event) {

			let inputText = $(this).val();
			let validPattern = inputText == "" || inputText.search(options.pattern) == 0;
			let validLength =  inputText.length <= options.maxLength;

			if (validLength && validPattern) {
				oldValue = inputText;
				phoneChange(inputText.length >= options.minLength);
			} else {
				$(this).val(oldValue);
			}
		});

	};
})(jQuery);

// -----------------------------------------------------------------------------

function checkParams(VerifyArguments) {

	let resultParams = {};

	switch(VerifyArguments.length) {
		case 0:
			resultParams.options = {};
			resultParams.phoneChange = function(){};
			break;

		case 1:
			if ($.isFunction(VerifyArguments[0])) {
				resultParams.phoneChange = VerifyArguments[0];
				resultParams.options = {};
			} else if ($.isPlainObject(VerifyArguments[0])) {
				resultParams.options = VerifyArguments[0];
				resultParams.phoneChange = function(){};
			} else {
				throw new TypeError("Передаваемый параметр метода должен быть функцией или объектом.");
			}
			break;

		case 2:
			if ($.isPlainObject(VerifyArguments[0]) && $.isFunction(VerifyArguments[1])) {
				resultParams.options = VerifyArguments[0];
				resultParams.phoneChange = VerifyArguments[1];
			} else {
				throw new TypeError("Первый параметр должен быть объектом, а второй функцией.");
			}
			break;

		default:
			throw new TypeError("Метод принимает не более двух параметров: объект и функция");
			break;
	}

	let defaultOptions = {
		pattern: /^\+[0-9]*$/,
		minLength: 9,
		maxLength: 18
	}
	resultParams.options = $.extend({}, defaultOptions, resultParams.options);

	return resultParams;
}
