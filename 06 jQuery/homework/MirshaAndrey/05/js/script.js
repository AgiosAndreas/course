$(function() {
  $("#search-user").submit(function(event) {
    event.preventDefault();
    gitsearch();
  });
  
  function gitsearch() {
    var username = $("#get-username").val().trim();
    $("#waitdata").show();
    var urlrequest = "https://api.github.com/users/" + username;
    $.get(urlrequest)
      .done(function(data) {
        $("#avatar").attr("src", data.avatar_url);
        $("#usernamepr").text(data.name);
        $("#git-year").text("since " + data.created_at.slice(0, 4));
        $("#followers").text(data.followers);
        $("#repositories").text(data.public_repos);
        $("#following").text(data.following);
        $("#profile").show();
        $("#waitdata").hide("slow");
        $("#user-profile")
          .empty()
          .append(username);
        $("#git-userLink").attr("href", "https://github.com/" + username);
      })
      
  };
});