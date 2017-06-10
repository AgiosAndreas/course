$(function(){

	var options = {
		pattern: /^\+[0-9]*$/,
		minLength: 9,
		maxLength: 18
	};

	var oldButtonStatus = false;

	$("#phone-input").validatePhone(options, function(response) {
		if (response != oldButtonStatus) {
			$("#button-ok").toggleClass("enabled disabled");
			oldButtonStatus = response;
		}
	}, function(error){
		$("#text-info").text(error);
	});

	$("#button-ok").click(function(event) {
		event.preventDefault();

		var phoneValue = $("#phone-input").val();
		if (phoneValue.length >= options.minLength) {
			$("#phone-number").text(phoneValue);
			$("#wrapper-inputs").css("display", "none");
			$("#text-result").css("display", "block");
		}
	});

});
