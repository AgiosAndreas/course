function sortParagraphs() {
    
    var $elements = $( "p" );
    var $target = $( "#baconIpsumOutput" );

    $elements.sort(function (a, b) {

        return $(a).html().length - $(b).html().length;

    });
    
    $elements.detach().appendTo($target);
}