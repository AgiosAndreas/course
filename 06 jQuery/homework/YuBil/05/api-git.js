(function($){
    $('#button-addon2').on('click', function(e) {
        e.preventDefault();
        $('#loader').removeClass("d-none");

        var userName = $('#gitusername').val().trim();
        var promise = $.ajax({methodType: "GET", url: `https://api.github.com/users/${userName}`});

        promise.then((data) => {
            
            var props = {
                fullName: (function() {
                    if (data.name == undefined)
                        return data.login;

                    return data.name;
                })(),
                userName:   data.login,
                avatarUrl:  data.avatar_url,
                profileUrl: data.html_url,
                followersNum:   data.followers,
                followingNum:   data.following,
                reposNum:       data.public_repos,
                createdDate:    data.created_at.substring(0,10)
            }
    

            $.getScript("get-templates.js", function() {
                $('#gitdata').html(getTemplates(props, "card"));
            });
            
            $('#loader').addClass("d-none");
        });

        promise.catch((data) => {
            var props = { userName: userName };
            $('#gitdata').html(getTemplates(props, "not-found"));
            $('#loader').addClass("d-none");
        });
    });
})(jQuery);