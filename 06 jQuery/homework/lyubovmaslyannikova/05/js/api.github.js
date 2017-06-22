$(function() {

	'use strict';

	function getGitHubData(apiUrl) {

		return $.ajax({
			url: apiUrl,
			beforeSend: showSpinner()
		})

		.fail(function() {
			hideSpinner();
		})

		.promise();
	}

	function updateUserData(gitUser) {

		$('#avatar').prop('src', gitUser.avatar_url);
		$('#git-username').text(gitUser.name);
		$('#git-creation-date').text('since	' + new Date(gitUser.created_at).getFullYear());
		$('#git-login').prop('href',	gitUser.html_url).text(gitUser.login);
		$('#followers').text(gitUser.followers);
		$('#repositories').text(gitUser.public_repos);
		$('#following').text(gitUser.following);

		$('.user-profile').show();
	}

	function showSpinner() {

		let $avatar = $('#avatar');

		$avatar.data('src', $avatar.prop('src'));
		$avatar.prop('src', $avatar.data('loader'));
	}

	function hideSpinner() {

		let $avatar = $('#avatar');

		$avatar.prop('src', $avatar.data('src'));
	}

	function showAlert(message) {

		if(!message) {
			return false;
		}

		let $alert = $('#alert');

		$alert.show();

		$alert.animate({
			right: 50
		});

		$alert.find('.text').text(message);
	}

	function hideAlert() {
		let $alert = $('#alert');

		$alert.hide();
		$alert.css('right', 0);
	}

	$('#alert .close').on('click', function() {
		hideAlert();
	});

	$('.search-btn').on('click', function() {

		let name = $.trim($('#search-input').val());

		if (name.length === 0) {
			showAlert('GitHub username doesn\'t specified.');
			return false;
		}

		let getGitHubUser = getGitHubData('https://api.github.com/users/' + name);

		getGitHubUser

		.done(function(gitUser) {
			updateUserData(gitUser);
		})

		.fail(function(response) {
			let message = response.statusText;

			if (response.status === 404) {
				message	=	'User ' + name + ' ' + response.statusText.toLowerCase();
			}

			showAlert(message);
		});
	});

})
