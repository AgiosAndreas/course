"use strict"
function ghSearch() {
	let username = $("#ghUsername").val();

	$(".loading-container").show();

	let request = $.ajax({url: "https://api.github.com/users/" + username}).promise();
	setTimeout(function () {
	
		request.done(function(data) {
			$("#user-avatar").attr("src", data.avatar_url);
			$("#user-name").text(data.name);
			$("#user-since").text("Since: " + data.created_at.slice(0, 4))
			$("#user-followers").text(data.followers);
			$("#user-repos").text(data.public_repos);
			$("#user-following").text(data.following);
			$("#user-link").attr("href", data.html_url)
			$("#user-nickname").text(data.login);
			$(".loading-container").hide();
			$(".output-container").slideDown(1000);
			$(".alert-success").text("User '"+ username +"' successfully found!")
				.delay(1000)
				.slideDown(1500)
				.delay(1000)
				.slideUp(1500);

		}).fail(function(data) {
			$(".loading-container").hide();
			$(".alert-danger").text("Error!")
				.delay(1000)
				.slideDown(1500)
				.delay(4000)
				.slideUp(1500);
		});
	}, 2000);

}