(function( $ ) {
	$.fn.validPhoneNumber = function(pattern, blockParams) {
		var oldValue = "";

		this.on("input", function(event) {

			// Смотрим соответствие регулярному выражению
			// Извини за длинную конструкцию, но ее сокращение выглядит еще хуже
			if ($(this).val().length <= blockParams.maxCharacters && ($(this).val().search(pattern) == 0 || $(this).val() == "")) {
				oldValue = $(this).val();
			} else {
				$(this).val(oldValue);
			}

			// Визуально блокируем/разблокируем кнопку при достижении количества необхоимых символов
			if ($(this).val().length >= blockParams.minCharacters) {
				$(blockParams.buttonName).css({
					"background-color":blockParams.colorEnabled,
					"cursor":"pointer"
				})
			} else {
				$(blockParams.buttonName).css({
					"background-color":blockParams.colorDisabled,
					"cursor":"default"
				})
			}

		});

	};
})(jQuery);
