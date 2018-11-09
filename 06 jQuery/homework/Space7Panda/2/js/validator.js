"use strict";
(function ($) {
	$.fn.validate = function(params) {

		var defaultParams = {
			pattern: /^(\+([0-9])*)$/,
			minLength: 9,
			maxLength: 18,
			specialChar : '+',
			afterValidation: function(){}
		};

		var params = $.extend(defaultParams, params);

		if (params.minLength > params.maxLength) {
			throw {"Error":`Warning! minLength(${params.minLength})is bigger than maxLength(${params.maxLength}`};
		}

		if (typeof params.afterValidation !== 'function') { 
			throw {"Error":"params.afterValidation is not a function"};
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
}(jQuery));