$(function(){

	var options = {
		pattern: /^\+[0-9]*$/,
		minLength: 9,
		maxLength: 18
	};

	var oldButtonStatus = false;

	$("#phone-input").validatePhone(options, function(isValid) {
		if (isValid != oldButtonStatus) {
			$("#button-ok").toggleClass("enabled disabled");
			oldButtonStatus = isValid;
		}
	});

	$("#button-ok").click(function(event) {
		$("#phone-number").text($("#phone-input").val());
		$("#wrapper-inputs").css("display", "none");
		$("#text-result").css("display", "block");
	});

});
