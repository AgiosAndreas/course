(function($) {

	$.fn.validInput = function(options) {
		options = $.extend({
			minLength: 9,
			maxLength: 17,
			charPlus: '+',
			afterValidation: checkinput
		}, options);

		this.prop('maxlength', options.maxLength);
		this.on('change keyup input', function() {
			var phone = this.value;

			if (0 < phone.length) {
				this.value = options.charPlus + phone.replace(/\D/g, '');
			}

			if ($.isFunction(options.afterValidation) == true) {
				var validShow = options.minLength < this.value.length;
				options.afterValidation.call(this, validShow);
			}

		});
	};
}(jQuery));
