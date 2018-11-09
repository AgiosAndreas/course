"use strict"
function ghSearch(username) {
	let request = $.ajax({url: "https://api.github.com/users/" + username});
	return request;
}