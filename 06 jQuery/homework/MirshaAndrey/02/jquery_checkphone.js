(function($) {

	$.fn.checkPhoneForm = function(options) {
		options = $.extend({
			minLength: 9,
			maxLength: 17,
			charPlus: '+',
			highlightingCorrectness: checkinput
		}, options);

		this.prop('maxlength', options.maxLength);
		this.on('change keyup input', function() {
			var phone = this.value;

			if (0 < phone.length) {
				this.value = options.charPlus + phone.replace(/\D/g, '');
			}

			if ($.isFunction(options.highlightingCorrectness) == true) {
				var colorResult = options.minLength < this.value.length;
				options.highlightingCorrectness.call(this, colorResult);
			}

		});
	};
}(jQuery));

