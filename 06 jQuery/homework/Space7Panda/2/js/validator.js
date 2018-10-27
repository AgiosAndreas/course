"use strict";
(function ($) {
	$.fn.validate = function(params) {

		var defaultParams = {
			pattern: /^(\+([0-9])*)$/,
			minLength: 9,
			maxLength: 18,
			specialChar : '+',
			afterValidation: checkValidation
		}

		var params = $.extend(defaultParams, params);
		
		this.prop('maxlength', params.maxLength);
		
		this.on('change keyup input', function() {

			let phoneNumber = this.value;
			
			if (!typeof phoneNumber == "string") {
				return false;
			}

			if (params.minLength > params.maxLength) {
				console.log(`Warning! minLength(${params.minLength})is bigger than maxLength(${params.maxLength})`)

				params.minLength = params.maxLength - 1;

				console.log(`minLength changed to (${params.minLength})`)
			}

			if (!params.pattern.test(this.value)) {

				if (phoneNumber.length > 1) {
					this.value = params.specialChar + phoneNumber.replace(/\D/g, '');
				} else {
					this.value = '';
				}
			}

			phoneNumber = this.value;

			if (typeof params.afterValidation === 'function') {
				
				var data = {
					minLength: params.minLength,
					phoneNumberLenght: phoneNumber.length
				}

				params.afterValidation.call(this, data);
			}
		});
	};

	function checkValidation (data) {
		
		if ( !data ) {
			return false;
		}

		var $this = $(this);

		if (data.phoneNumberLenght < data.minLength) {
			$this.css('color', 'red');
		} else {
			$this.css('color', 'green');
		}
	}
	
}(jQuery));