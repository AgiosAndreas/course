(function($) {

	function checkinput(color) {

		var check = color ? '#0cfa00' : '#ff3d3d';
		$(this).css('background-color', check);

	}

	checkinput2 = function(color) {
		var check = color ? '#0cfa00' : '#ff3d3d';
		$(this).css('border-color', check);
	}

	$.fn.checkPhoneForm = function(options) {
		options = $.extend({
			minLength: 9,
			maxLength: 17,
			format: /^(\+([0-9])*)$/,
			charPlus: '+',
			highlightingCorrectness: checkinput
		}, options);

		this.prop('maxlength', options.maxLength);
		this.on('change keyup input', function() {
			var phone = this.value;

			if (0 < phone.length) {
				this.value = options.charPlus + phone.replace(/\D/g, '');
			} else {
				this.value;
			}

			if (typeof options.highlightingCorrectness === 'function') {
				var color = options.minLength < this.value.length;
				options.highlightingCorrectness.call(this, color);
			}
		});
	};


}(jQuery));
