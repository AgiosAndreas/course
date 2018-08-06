(function($){

    $('#button-addon2').on('click', function(e) {

        e.preventDefault();
        $('#loader').removeClass("d-none");

        var userName = $('#gitusername').val().trim();
        var promise = $.ajax({methodType: "GET", url: `https://api.github.com/users/${userName}`});

        promise.then((data) => {

            $.getScript("gitCardTmpl.js", function() {
                $('#gitdata').html(getTemplate(data));
            });
            
            $('#loader').addClass("d-none");
        });

        promise.catch((data) => {
            $('#gitdata').html('<div class="alert alert-danger" role="alert">User '+userName+' not found!</div>');
            $('#loader').addClass("d-none");
        });
    });
})(jQuery);