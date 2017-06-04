(function ($) {

	$.fn.validate = function(settings) {

		settings = $.extend({
			pattern: /^(\+([0-9])*)$/,
			minLength: 9,
			maxLength: 17,
			specialChar : "+"
		}, settings);

		this.prop("maxlength", settings.maxLength);

		this.on("change keyup input", function() {
			var phone = this.value;

			if(!settings.pattern.test(phone)) {
				phone = phone.length > 1 ? settings.specialChar + phone.replace(/\D/g, '') : "";

				this.value = phone;
			}

			var color = phone.length < settings.minLength ? "red" : "green";
			$(this).css("border-color", color);
		});

		return this;
	};

}(jQuery));
