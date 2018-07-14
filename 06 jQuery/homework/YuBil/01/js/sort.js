function sort() {
    var $elements = $("p");
    var $target = $("main");

    $elements.sort(function (a, b) {
        return $(a).text().length - $(b).text().length;
    });
    
    $elements.remove().appendTo($target);
}