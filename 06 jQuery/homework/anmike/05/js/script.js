$(function() {

  $("#git-search").submit(function(event) {
    event.preventDefault();
    searchGitUser();
  });

  function searchGitUser() {

    var username = $("#get-username").val().trim();
    if (username == "") {
      var errorText = ("Please, spesify the username");
      showError(errorText);
      return;
    }

    var requestURL = "https://api.github.com/users/" + username;
    $("#server-busy").show();

    $.getJSON(requestURL)
      .done(function(data) {
        $("#git-avatar").attr("src", data.avatar_url);
        $("#git-username").text(data.name);
        $("#git-year").text("since " + data.created_at.slice(0, 4));
        $("#followers").text(data.followers);
        $("#repos").text(data.public_repos);
        $("#following").text(data.following);
        $("#github-profile").show();
        $("#server-busy").hide("slow");
        $("#git-login")
          .empty()
          .append(username);
        $("#git-userLink").attr("href", "https://github.com/" + username);
      })
      .fail(function(data, textStatus, error) {
        var errorText = ("User <strong>" + username + "</strong> " + error.toLowerCase());
        $("#server-busy").hide("slow");
        showError(errorText);
      });
  };

  function showError(errorText) {
    $(".alert-danger")
      .empty()
      .append(errorText)
      .show();
    setTimeout(function() {
      $(".alert-danger").hide("slow");
    }, 2000);
  };

});
