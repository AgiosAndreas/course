'use strict';

$(function() {

	function updateUserData(user) {
		$('#avatar').prop('src', user.avatar_url);
		$('#git-username').text(user.name);
		$('#git-creation-date').text('since ' + new Date(user.created_at).getFullYear());
		$('#git-login').prop('href', user.html_url).text(user.login);
		$('#followers').text(user.followers);
		$('#repositories').text(user.public_repos);
		$('#following').text(user.following);
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

		let $alert = $('.alert').addClass('active').show();
		$alert.find('.text').text(message);
	}

	function hideAlert() {
		$('.alert').hide();
	}

	$('.alert .close').on('click', hideAlert);

	$('.search-btn').on('click', () => {
		let name = $('#search-input').val().trim();

		if (name.length === 0) {
			showAlert('GitHub username doesn\'t specified.');

			return false;
		}

		showSpinner();

		let request = $.get({
			url: 'https://api.github.com/users/' + name
		}).promise();

		request.done((data) => {
			updateUserData(data);
		})
		.fail((response) => {
			let message = response.statusText;

			hideSpinner();

			if (response.status === 404) {
				message = 'User ' + name + ' ' + response.statusText.toLowerCase();
			}

			showAlert(message);
		});
	});

})
