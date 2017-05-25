(function( $ ) {
	$.fn.validPhoneNumber = function(options, callback) {

		var DEFAULT_PATTERN = /^\d*$/;
		var DEFAULT_MINCHARACTERS = 5;
		var DEFAULT_MAXCHARACTERS = 20;

		if (typeof options === "object") {
			options.pattern = options.pattern || DEFAULT_PATTERN;
			options.minCharacters = options.minCharacters || DEFAULT_MINCHARACTERS;
			options.maxCharacters = options.maxCharacters || DEFAULT_MAXCHARACTERS;
		} else {
			options = {
				pattern: DEFAULT_PATTERN,
				minCharacters: DEFAULT_MINCHARACTERS,
				maxCharacters: DEFAULT_MAXCHARACTERS
			}
		}

		var oldValue = "";

		this.on("input", function(event) {

			if ($(this).val().length <= options.maxCharacters && ($(this).val().search(options.pattern) == 0 || $(this).val() == "")) {
				oldValue = $(this).val();
			} else {
				$(this).val(oldValue);
			}

			if ($.isFunction(callback)) {
				var isValid = $(this).val().length >= options.minCharacters;
				callback(isValid);
			}

		});

	};
})(jQuery);
