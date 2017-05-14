(function( $ ) {
	$.fn.delimiterCharacters = function() {
		this.keypress(function(event) {
			return (event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode == 43;
		});
	};
})(jQuery);
