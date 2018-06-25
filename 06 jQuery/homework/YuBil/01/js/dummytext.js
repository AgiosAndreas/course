function getDummyText() {

    $.getJSON('https://baconipsum.com/api/?callback=?', 
        { 'type':'meat-and-filler', 'start-with-lorem':'1', 'paras':'1' }, 
        function(baconGoodness) {

            if (baconGoodness && baconGoodness.length > 0) {
                
                var dummyTextSubString = baconGoodness[0].substr(0, $( "#paragraphLength" ).val());
                $("#baconIpsumOutput").append('<p class="border-bottom border-gray">' + dummyTextSubString + '</p>');
            }
        });
}