(function($) {

	$.fn.verifyInput = function(options) {
		options = $.extend({
			minLength: 9,
			maxLength: 17,
			charPlus: '+',
			afterValidation: checkInput
		}, options);

		this.prop('maxlength', options.maxLength);
		this.on('change keyup input', function() {
			var phone = this.value;

			if (0 < phone.length) {
				this.value = options.charPlus + phone.replace(/\D/g, '');
			}

			if ($.isFunction(options.afterValidation)) {
				var validShow = options.minLength < this.value.length;
				options.afterValidation.call(this, validShow);
			}

		});
	

	function checkInput(validShow) {

		var check = validShow ? '#0cfa00' : '#ff3d3d';
		$(this).css('background-color', check);

	}

	};
}(jQuery));
 