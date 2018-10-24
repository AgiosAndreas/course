"use strict";	
(function ($) {
	$.fn.validate = function(params) {

		var params = {
			pattern: /^(\+([0-9])*)$/,
			color: 'black',
			minLength: 9,
			minLengthColor: 'blue',
			maxLength: 17,
			maxLengthColor: 'green',
			specialChar : '+'};
	
		this.prop('maxlength', params.maxLength);
		
		this.on('change keyup input', function() {

			let phoneNumber = this.value;
			
			if (!typeof phoneNumber == "string") {
				throw {"Error":"input is not a string"}
			}

			if (!params.pattern.test(this.value)) {

				if (phoneNumber.length > 1) {
					this.value = params.specialChar + phoneNumber.replace(/\D/g, '');
				} else {
					this.value = '';
				}
				
			}

			if (phoneNumber.length < params.minLength ) {
				$(this).css('color', params.color);
			}

			if (phoneNumber.length >= params.minLength ) {
				$(this).css('color', params.minLengthColor);
			}

			if (phoneNumber.length == params.maxLength ) {
				$(this).css('color', params.maxLengthColor);
			}
		});
	};


}(jQuery));


/*	
	$(document).ready(function() {
	$('#phone').bind("change keyup input click", function() {
		if (!this.value.match(/^(\+([0-9])*)$/)) {
		this.value = "+" + this.value.replace(/\D/g, '');
		}
		});
		$('#phone').attr(maxLength, 17);

}); */