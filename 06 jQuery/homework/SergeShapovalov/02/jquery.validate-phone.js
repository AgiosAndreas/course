"use strict";

(function( $ ) {
	$.fn.validatePhone = function(options, phoneChange) {

		let checkedParams = checkParams(arguments.length, options, phoneChange);
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

function checkParams(countParams, options, phoneChange) {

	let resultParams = {};

	switch(countParams) {
		case 0:
			resultParams.options = {};
			resultParams.phoneChange = function(){};
			break;

		case 1:
			if ($.isFunction(options)) {
				resultParams.phoneChange = options;
				resultParams.options = {};
			} else if ($.isPlainObject(options)) {
				resultParams.options = options;
				resultParams.phoneChange = function(){};
			} else {
				throw new TypeError("Передаваемый параметр метода должен быть функцией или объектом.");
			}
			break;

		case 2:
			if ($.isPlainObject(options) && $.isFunction(phoneChange)) {
				resultParams.options = options;
				resultParams.phoneChange = phoneChange;
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
