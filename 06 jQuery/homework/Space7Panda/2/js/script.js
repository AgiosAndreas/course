"use strict";
function startCustomValidation (status) {

	let successText = 'Phone number is valid.';
	let failText = 'Phone number is to short!';

	if (status == true) {
		$('.phoneNumberContainer').text(successText);
	} else {
		$('.phoneNumberContainer').text(failText);
	}

}