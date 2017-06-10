(function( $ ) {
	$.fn.validatePhone = function(options, inputChange, error) {

		if (!$.isFunction(inputChange)) {
			error("Параметр inputChange должен быть функцией");
			return;
		}

		var defaultOptions = {
			pattern: /^\d*$/,
			minLength: 5,
			maxLength: 20
		}
		$.extend(defaultOptions, options);

		var oldValue = "";

		this.on("input", function(event) {

			try {

				var validLength =  $(this).val().length <= defaultOptions.maxLength;
				if (validLength && ($(this).val() == "" || $(this).val().search(defaultOptions.pattern) == 0)) {
					oldValue = $(this).val();
				} else {
					$(this).val(oldValue);
				}

				var isValid = $(this).val().length >= defaultOptions.minLength;
				inputChange(isValid);

			} catch (e) {
				error(e.name + " : " + e.message);
			}
		});

	};
})(jQuery);
