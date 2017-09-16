"use strict";

$(function() {
	$("#inputSuccess1").phoneValidation({
		onValidation(validPhone) {
			$(this).css({
				"color": "red",
				"border-color": "red"
			});
			if (validPhone) {
				$(this).css({
					"color": "green",
					"border-color": "green"
				});
			}
		}
	});

	$("#inputSuccess2").phoneValidation({
		onValidation(validPhone) {
			$(this).parent().removeClass("has-success");
			$(this).siblings().removeClass("btn-info");
			if (validPhone) {
				$(this).parent().addClass("has-success");
				$(this).siblings().addClass("btn-info");
			}
		}
	});
});
