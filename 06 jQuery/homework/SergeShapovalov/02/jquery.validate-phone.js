"use strict";

(function( $ ) {
	$.fn.validatePhone = function() {

		let checkedParams = checkParams(arguments);
		let options = checkedParams.options;
		let phoneChange = checkedParams.phoneChange;

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

function checkParams(params) {

	let resultParams = {};

	switch(params.length) {
		case 0:
			resultParams.options = {};
			resultParams.phoneChange = function(){};
			break;

		case 1:
			if ($.isFunction(params[0])) {
				resultParams.phoneChange = params[0];
				resultParams.options = {};
			} else if ($.isPlainObject(params[0])) {
				resultParams.options = params[0];
				resultParams.phoneChange = function(){};
			} else {
				throw new TypeError("Передаваемый параметр метода должен быть функцией или объектом.");
			}
			break;

		case 2:
			if ($.isPlainObject(params[0]) && $.isFunction(params[1])) {
				resultParams.options = params[0];
				resultParams.phoneChange = params[1];
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
