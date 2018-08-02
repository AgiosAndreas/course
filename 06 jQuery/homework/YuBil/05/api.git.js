(function($){

    $('#button-addon2').on('click', function(e) {

        // HREF value doesn’t get loaded into the address bar
        e.preventDefault();

        // progress gif
        $('#ghapidata').html('<div id="loader"><img src="load.gif" alt="loading..."></div>');
        
         // val() – Get or set the value of form elements
        var username = $('#gitusername').val().trim();

        var promise = $.ajax({methodType: "GET", url: `https://api.github.com/users/${username}`});

        promise.then((resp) => {

            var fullname   = resp.name;
            var username   = resp.login;
            var aviurl     = resp.avatar_url;
            var profileurl = resp.html_url;
            var location   = resp.location;
            var followersnum = resp.followers;
            var followingnum = resp.following;
            var reposnum     = resp.public_repos;
            var created      = resp.created_at;

            if (fullname == undefined) { 
            
                fullname = username; 
            }

            $.get('profile.tmpl', function(data) {
                console.log(data);
            }); 

            var outhtml = '<h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h2>';
            outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username+'"></a></div>';
            outhtml = outhtml + '<p>Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'</p>';
            outhtml = outhtml + '<p>Created at: '+created+'</p></div>';
            outhtml = outhtml + '<div class="repolist clearfix">';

            $('#ghapidata').html(outhtml);
        });

        promise.catch(((error) => {
            console.log("ERRRO:");
        }));
    });
})(jQuery);