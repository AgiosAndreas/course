"use strict"
function ghSearch() {
	let username = $("#ghUsername").val();

	$(".loading-container").show();

	let request = $.ajax({url: "https://api.github.com/users/" + username}).promise();

	request.done(function(data) {
		$("#user-avatar").attr("src", data.avatar_url);
		$('#user-since').text("Since: " + data.created_at.slice(0, 4))
		$(".loading-container").hide();
	}).fail(function(data) {
		$(".loading-container").hide();
	});
}