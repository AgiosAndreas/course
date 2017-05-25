$(function(){

	var options = {
		pattern: /^\+[0-9]*$/,
		minLength: 9,
		maxLength: 18
	};

	$("#phone-input").validPhoneNumber(options, function(response) {
		if (response) {
			$("#button-ok").css({
				"background-color": "#0fc80f",
				"cursor": "pointer"
			})
		} else {
			$("#button-ok").css({
				"background-color": "#5f5f5f",
				"cursor": "default"
			})
		}
	}, function(error){
		$("#text-info").text(error);
	});

	$("#button-ok").click(function(event) {
		event.preventDefault();
		if ($('#phone-input').val().length >= options.minLength) {
			$("#wrapper-inputs").css("display", "none");
			$("#text-info").text(
				"Благодарим за подписку на \"Кошачий гороскоп\"! " +
				"На номер телефона " + $('#phone-input').val() + " будут отправляться " +
				"все гороскопы кошачьих знаков зодиака каждые 12 минут. " +
				"За каждое сообщение с Вашего счета будут списаны 0,5$. " +
				"Для отказа от подписки, пожалуйста, отправьте нам нотариально заверенное заявление " +
				"по адресу: с. Мухосранск, д.15. Заявка будет рассмотрена в течение 35 календарных дней."
			);
		}
	});

});
