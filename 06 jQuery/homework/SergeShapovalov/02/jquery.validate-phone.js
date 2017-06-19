(function( $ ) {
	$.fn.validatePhone = function(options, onChange) {

		if ($.isFunction(options)) {
			var tempArgument = onChange
			onChange = options;
			options = tempArgument;
		}

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

			if ($.isFunction(onChange)) {
				onChange(inputText.length >= options.minLength);
			}
		});

	};
})(jQuery);
