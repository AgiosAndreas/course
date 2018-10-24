"use strict";
(function ($) {
	$.fn.validate = function(params) {

		var params = {
			pattern: /^(\+([0-9])*)$/,
			defaultColor: 'black',
			minLength: 9,
			minLengthColor: 'blue',
			maxLength: 18,
			maxLengthColor: 'green',
			specialChar : '+'
		};
		
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
				$(this).css('color', params.defaultColor);
			}

			if (phoneNumber.length >= params.minLength ) {
				$(this).css('color', params.minLengthColor);
			}

			if (phoneNumber.length == params.maxLength ) {
				$(this).css('color', params.maxLengthColor);
			}

			$('.submiter').click(function () { 
				let successText = 'Ваш номер телефона: ' + phoneNumber;
				let failText = 'Ваш номер телефона не должен состоять меньше чем из ' + 
								(params.minLength - 1) + 
								' чисел';

				if (phoneNumber.length < params.minLength) {
					$('.phoneNumber').text(failText);
					
				} else {

				$('.phoneNumber').text(successText);
				
				}
			});

		});
	};
}(jQuery));