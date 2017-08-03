(function($) {

	$.fn.checkform = function(options) {
		options = $.extend({
			minLength: 9,
			maxLength: 17,
			format: /^(\+([0-9])*)$/,
			Charplus: '+',
		}, options);

		this.prop('maxlength', options.maxLength);
		this.on('change keyup input', function() {
			var phone = this.value;

			if (options.format.test(phone) || (
				this.value = phone = 1 < phone.length ? options.Charplus + phone.replace(/\D/g, '') : '')) {
				var data = {
					minLength: options.minLength
				};
			}

		});

		return this;
	};

}(jQuery));
