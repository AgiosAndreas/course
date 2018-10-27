function startCustomValidation (data) {

	$('.submiter').click(function () { 

		let successText = 'Ваш номер телефона: ' + data.phoneNumber;
		let failText = 'Ваш номер телефона не должен состоять меньше чем из ' + 
						(data.minLength - 1) + 
						' чисел';

		if (data.phoneNumberLenght < data.minLength) {
			$('.phoneNumberContainer').text(failText);
		} else {
			$('.phoneNumberContainer').text(successText);	
		}
		
	});
}