(function($) {

	$.fn.checkPhoneForm = function(options) {
		options = $.extend({
			minLength: 9,
			maxLength: 17,
			format: /^(\+([0-9])*)$/,
			CharPlus: '+',
		}, options);

		this.prop('maxlength', options.maxLength);
		this.on('change keyup input', function() {
			var phone = this.value;

			if (options.format.test(phone) || (this.value = phone = 1 < phone.length ? options.Charplus + phone.replace(/\D/g, '') : '')) {
				return this;
			}

		});
	};

}(jQuery));