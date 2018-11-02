"use strict";
(function ($) {
	$.fn.validate = function(params) {

		var defaultParams = {
			pattern: /^(\+([0-9])*)$/,
			minLength: 9,
			maxLength: 18,
			specialChar : '+',
			afterValidation: checkValidation
		};

		var params = $.extend(defaultParams, params);
		
		if (typeof params.afterValidation !== 'function') { 
			console.error("params.afterValidation is not a function");

			return false;
		}

		if (params.minLength > params.maxLength) {
			console.log(`Warning! minLength(${params.minLength})is bigger than maxLength(${params.maxLength})`);

			params.minLength = params.maxLength - 1;

			console.log(`minLength changed to (${params.minLength})`);
		}
		
		this.prop('maxlength', params.maxLength);
		
		this.on('change keyup input', function() {

			let phoneNumber = this.value;
			
			if (!params.pattern.test(this.value) && phoneNumber.length > 0) {

				this.value = params.specialChar + phoneNumber.replace(/\D/g, '');
			}
			
			params.afterValidation.call(this, phoneNumber.length > params.minLength);
			
		});
	};

	function checkValidation (data) {

		if (data == true) {
			$(this).css('color', 'green');
		} else {
			$(this).css('color', 'red');
		}
	}
	
}(jQuery));