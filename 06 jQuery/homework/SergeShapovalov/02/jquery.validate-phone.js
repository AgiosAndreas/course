(function( $ ) {
	$.fn.validatePhone = function(options, phoneChange) {

		switch(arguments.length) {
		  case 0:
				options = {};
				phoneChange = function(){};
		    break;

		  case 1:
				if ($.isFunction(options)) {
					phoneChange = options;
					options = {};
				} else if (!$.isPlainObject(options)) {
					throw new TypeError("Передаваемый параметр метода должен быть функцией или объектом.");
				}
		    break;

			case 2:
				if (!$.isPlainObject(options) || !$.isFunction(phoneChange)) {
					throw new TypeError("Первый параметр должен быть объектом, а второй функцией.");
				}
				break;

		  default:
				throw new TypeError("Метод принимает не более двух параметров: объект и функция");
		}

		var defaultOptions = {
			pattern: /^\+[0-9]*$/,
			minLength: 9,
			maxLength: 18
		}
		options = $.extend({}, defaultOptions, options);

		var oldValue = "";

		this.on("input", function(event) {

			var inputText = $(this).val();
			var validLength =  inputText.length <= options.maxLength;

			if (validLength && (inputText == "" || inputText.search(options.pattern) == 0)) {
				oldValue = inputText;
			} else {
				$(this).val(oldValue);
			}

			phoneChange(inputText.length >= options.minLength);
		});

	};
})(jQuery);
