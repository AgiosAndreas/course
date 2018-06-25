function sortParagraphs() {
    var $elements = $( "p" );
    console.log($elements);
    var $target = $( "#baconIpsumOutput" );
    console.log($target); 

    $elements.sort(function (a, b) {
        return $(a).html().length - $(b).html().length;
    });
     
    $elements.detach().appendTo($target);
}