$(function() {

  function showError(errorText) {
    $("#errorAlert")
      .empty()
      .append(errorText)
      .show();

    setTimeout(function() {
      $("#errorAlert").hide("slow");
    }, 2000);
  };

  function searchGitUser() {

    var username = $("#get-username").val().trim();

    if (username == "") {
      var errorText = ("Please, spesify the username");
      showError(errorText);
      return;
    }

    var requestURL = "https://api.github.com/users/" + username;
    $('#serverBusy').show();
    $.getJSON(requestURL)

      .done(function(data) {
        $("#git-avatar").attr("src", data.avatar_url);
        $("#git-username").text(data.name);
        $("#git-year").text("since " + data.created_at.slice(0, 4));
        $("#followers").text(data.followers);
        $("#repos").text(data.public_repos);
        $("#following").text(data.following);
        $("#github-profile").show();
        $("#serverBusy").hide("slow");
        $("#git-login")
          .empty()
          .append(username);
        $("#git-userLink").attr("href", "https://github.com/" + username);
      })

      .fail(function(data, textStatus, error) {
        var errorText = ("User <strong>" + username + "</strong> " + error.toLowerCase());
        $("#serverBusy").hide("slow");
        showError(errorText);
      });
  }

  $("#btn-search").click(function() {
    searchGitUser();
  })

  $("#get-username").keypress(function() {
    if (event.keyCode == 13) {
      searchGitUser();
    }
  });

  $("#git-search").submit(function(event) {
    event.preventDefault();
  })

});
