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
	});

	$("#button-ok").click(function(event) {
		$("#phone-number").text($("#phone-input").val());
		$("#wrapper-inputs").css("display", "none");
		$("#text-result").css("display", "block");
	});

});
