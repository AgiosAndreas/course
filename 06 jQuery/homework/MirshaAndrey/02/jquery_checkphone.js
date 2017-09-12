(function($) {

	$.fn.checkPhoneForm = function(options) {
		options = $.extend({
			minLength: 9,
			maxLength: 17,
			format: /^(\+([0-9])*)$/,
			charPlus: '+',
		}, options);
		this.prop('maxlength', options.maxLength);
		this.on('change keyup input', function() {
			var phone = this.value;
			if (0 < phone.length) {
				this.value = options.charPlus + phone.replace(/\D/g, '');
			} else {
				this.value;
			}
			
			var color = options.minLength < this.value.length ? '#0cfa00' : '#ff3d3d';
			$(this).css('background-color', color);
		});
	};
}(jQuery));
