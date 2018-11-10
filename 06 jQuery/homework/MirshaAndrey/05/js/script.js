$(function() {
  $("#search-user").submit(function(event) {
    event.preventDefault();
    gitsearch();
  });
  
  function gitsearch() {
    var userName = $("#get-userName").val().trim();
    $("#waitdata").show();
    var urlrequest = "https://api.github.com/users/" + userName;
    $.get(urlrequest)
      .done(function(data) {
        $("#avatar").attr("src", data.avatar_url);
        $("#userNamepr").text(data.name);
        $("#git-year").text("since " + data.created_at.slice(0, 4));
        $("#followers").text(data.followers);
        $("#repositories").text(data.public_repos);
        $("#following").text(data.following);
        $("#profile").show();
        $("#waitdata").hide("slow");
        $("#user-profile")
          .empty()
          .append(userName);
        $("#git-userLink").attr("href", "https://github.com/" + userName);
      })
      
  };
});