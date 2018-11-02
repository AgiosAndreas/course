"use strict";
function startCustomValidation (data) {

	$('.submiter').click(function () { 

		let successText = 'Phone number is valid.';
		let failText = 'Phone number is to short!';

		if (data == true) {
			$('.phoneNumberContainer').text(successText);
		} else {
			$('.phoneNumberContainer').text(failText);
		}

	});
}