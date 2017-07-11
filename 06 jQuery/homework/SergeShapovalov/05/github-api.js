"use strict";

function searchClick() {

	let username = $("#input-search").val().trim();

	if (username == "") return;

	let alertWait = $("#alert-wait");
	alertWait.show();

	let result = $.ajax({url: "https://api.github.com/users/" + username}).promise();

	result.done(function(data) {

		$("#image-logo").prop("src", data.avatar_url);
		$("#h-name").text(data.name);
		$("#p-login").text(data.login);
		$("#p-year").text("since " + data.created_at.split("-")[0]);
		$("#count-follovers").text(data.followers);
		$("#count-repos").text(data.public_repos);
		$("#count-folloving").text(data.following);

		alertWait.hide();
		$("#panel-main").show();

	}).fail(function(data) {

		alertWait.hide();
		showError("User " + username + " " + data.statusText.toLowerCase());
	});
}

function showError(error) {

	let alertError = $("#alert-error");
	alertError.text(error);
	alertError.show();

	setTimeout(function() {
		if (error == alertError.text()) alertError.hide();
	}, 3000);
}
