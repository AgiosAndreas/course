function sortParagraphs() {
    
    var $elements = $( "p" );
    var $target = $( "main" );

    $elements.sort(function (a, b) {
        return $(a).html().length - $(b).html().length;
    });
    
    $elements.detach().appendTo($target);
}