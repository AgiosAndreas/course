"use strict"
function ghSearch() {
	let username = $("#ghUsername").val();

	$(".loading-container").show();

	let request = $.ajax({url: "https://api.github.com/users/" + username}).promise();

	request.done(function(data) {

		console.log(data.name);

	}).fail(function(data) {
		$(".loading-container").hide();
	});
}