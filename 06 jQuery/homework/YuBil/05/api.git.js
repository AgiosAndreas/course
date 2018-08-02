(function($){

    $('#button-addon2').on('click', function(e) {

        e.preventDefault();

        $('#ghapidata').html('<div id="loader" class="text-center"><img src="load.gif" alt="loading..."></div>');
        
        var username = $('#gitusername').val().trim();

        var promise = $.ajax({methodType: "GET", url: `https://api.github.com/users/${username}`});

        promise.then((data) => {

            var fullname   = data.name;
            var username   = data.login;
            var avaurl     = data.avatar_url;
            var profileurl = data.html_url;
            var followersnum = data.followers;
            var followingnum = data.following;
            var reposnum     = data.public_repos;
            var created      = data.created_at.substring(0,10);

            console.log(created);

            if (fullname == undefined) { 
            
                fullname = username; 
            }

            var outhtml = '<div class="p-5 border rounded border-primary text-center text-muted">';
            outhtml = outhtml + '<a href="'+profileurl+'" target="_blank"><img class="rounded-circle mb-2" src="'+avaurl+'" width="80" height="80" alt="'+username+'"></a>';
            outhtml = outhtml + '<h2 class="mb-2">'+fullname+' (@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</h2>';
            outhtml = outhtml + '<p class="mb-2">Followers: '+followersnum+' # Following: '+followingnum+' # Repos: '+reposnum+'</p>';
            outhtml = outhtml + '<p class="mb-2">Created at: '+created+'</p></div>';
            outhtml = outhtml + '<div class="clearfix">';

            $('#ghapidata').html(outhtml);
        });

        promise.catch((data) => {
            $('#ghapidata').html('<div class="alert alert-danger" role="alert">User '+username+' not found!</div>');
        }); 
    });
})(jQuery);