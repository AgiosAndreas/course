function startScript() {

    $("#ghUsername").keypress(function(e) {

        if (e.which == 13) {
            ghSearch();
        }

    });

    $("#ghUsernameBtn").click(function (e) { 

        e.preventDefault();
        ghSearch();
        
    });
}