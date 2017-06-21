(function( $ ) {
	$.fn.validatePhone = function(options, phoneChange) {

		if ($.isFunction(options)) {
			phoneChange = options;
			options = {};
		}
		var withCallback = $.isFunction(phoneChange);

		var defaultOptions = {
			pattern: /^\d*$/,
			minLength: 5,
			maxLength: 20
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

			if (withCallback) {
				phoneChange(inputText.length >= options.minLength);
			}
		});

	};
})(jQuery);
