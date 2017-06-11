(function( $ ) {
	$.fn.validatePhone = function(options, inputChange, error) {

		var defaultOptions = {
			pattern: /^\d*$/,
			minLength: 5,
			maxLength: 20
		}
		options = $.extend({}, defaultOptions, options);

		var oldValue = "";

		this.on("input", function(event) {

			try {

				var inputText = $(this).val();
				var validLength =  inputText.length <= options.maxLength;

				if (validLength && (inputText == "" || inputText.search(options.pattern) == 0)) {
					oldValue = inputText;
				} else {
					$(this).val(oldValue);
				}

				if ($.isFunction(inputChange)) {
					var isValid = inputText.length >= options.minLength;
					inputChange(isValid);
				}

			} catch (e) {
				if ($.isFunction(error)) {
					error(e.name + " : " + e.message);
				}
			}
		});

	};
})(jQuery);
