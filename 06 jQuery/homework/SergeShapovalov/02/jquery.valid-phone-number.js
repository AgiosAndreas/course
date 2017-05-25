(function( $ ) {
	$.fn.validPhoneNumber = function(options, callback, error) {

		var validOptions = {
			pattern: /^\d*$/,
			minLength: 5,
			maxLength: 20
		}
		$.extend(validOptions, options);

		var oldValue = "";

		this.on("input", function(event) {

			var validLength =  $(this).val().length <= validOptions.maxLength;
			if (validLength && ($(this).val() == "" || $(this).val().search(validOptions.pattern) == 0)) {
				oldValue = $(this).val();
			} else {
				$(this).val(oldValue);
			}

			if ($.isFunction(callback)) {
				var isValid = $(this).val().length >= validOptions.minLength;
				callback(isValid);
			} else {
				error("Параметр callback должен быть функцией");
			}

		});

	};
})(jQuery);
