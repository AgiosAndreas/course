"use strict"
function ghSearch() {

	let username = $("#ghUsername").val();

	$(".loading-container").show();

	if (username == "") {

		$(".loading-container").hide();
		$(".alert-danger").text("Error: input field is empty").animateCustom()
	
		return;
	}

	let request = $.ajax({url: "https://api.github.com/users/" + username}).promise();
	
	setTimeout(function () {
	
		request.done(function (data) {
			
			searchSuccess(data);

		}).fail(function(data) {

			searchFail(data);

		});
	}, 2000);

}

function searchSuccess(data) {
	
	$("#user-avatar").attr("src", data.avatar_url);
	$("#user-name").text(data.name);
	$("#user-nickname").text(data.login);
	$("#user-since").text("Since: " + data.created_at.slice(0, 4))
	$("#user-followers").text(data.followers);
	$("#user-repos").text(data.public_repos);
	$("#user-following").text(data.following);
	$("#user-link").attr("href", data.html_url)
	$(".loading-container").hide();
	$(".output-container").slideDown(1000);
	$(".alert-success").text("User '"+ data.login +"' successfully found!").animateCustom();
}

function searchFail(data) {
	
	if (data.responseJSON.message === "Not Found") {

		$(".loading-container").hide();
		$(".alert-danger").text("Error: username is " + data.responseJSON.message ).animateCustom()

	} else {

		$(".loading-container").hide();
		$(".alert-danger").text("Error! Check console.").animateCustom()

	}
}

(function( $ ){
	$.fn.animateCustom = function() {
		this.delay(1000).slideDown(1500).delay(1000).slideUp(1500);
	}; 
 })( jQuery );