$(function() {
  $("#search-user").submit(function(event) {
    event.preventDefault();
    gitSearch();
  });

  function gitSearch() {
    var userName = $("#get-userName").val().trim();
    if (userName == "") {
      var errorText = ("Please, spesify the userName");
      showError(errorText);
      return;
    }
    var url = "https://api.github.com/users/" + userName;
    $("#gitLoad").show(); $.getJSON(url)
      .done(function(data) {
        $("#userNamepr").text(data.name);
        $("#followers").text(data.followers);
        $("#repositories").text(data.public_repos);
        $("#following").text(data.following);
        $("#gitProfile").show();
        $("#git-year").text("since " + data.created_at.slice(0, 4));
        $("#gitLoad").hide("slow");
        $("#avatar").attr("src", data.avatar_url);
        $("#userProfile")
          .empty()
          .append(userName);
        $("#git-userLink").attr("href", "https://github.com/" + userName);
      })
      .fail(function(data, textStatus, error) {
        var errorText = ("User <strong>" + userName + "</strong> " + error.toLowerCase());
        $("#gitLoad").hide("slow");
        showError(errorText);
      });
  }

  function showError(errorText) {
    $(".alert-danger")
      .empty()
      .append(errorText)
      .show();
    setTimeout(function() {
      $(".alert-danger").hide("slow");
    }, 2000);
  }
});
