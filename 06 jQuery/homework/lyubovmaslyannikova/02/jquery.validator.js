(function ($) {

	$.fn.validate = function(settings) {

		settings = $.extend({
			pattern: /^(\+([0-9])*)$/,
			minLength: 9,
			maxLength: 17,
			specialChar : '+',
			afterValidation: highlightInput
		}, settings);

		this.prop('maxlength', settings.maxLength);

		this.on('change keyup input', function() {

			var phone = this.value;

			if(!settings.pattern.test(phone)) {
				this.value = phone = phone.length > 1 ? settings.specialChar + phone.replace(/\D/g, '') : '';
			}

			if(typeof settings.afterValidation === 'function') {

				var data = {
					minLength: settings.minLength
				};

				settings.afterValidation.call(this, data);
			}
		});

		return this;
	};

	function highlightInput(data) {
		if( !data ) {
			return false;
		}

		var $this = $(this);
		var color = $this.val().length < data.minLength ? 'red' : 'green';

		$this.css('border-color', color);
	}

}(jQuery));
