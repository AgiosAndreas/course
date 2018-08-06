(function($) {
    
    $.fn.phoneNumberValidator = function(settings) {

        var params = $.extend({
            pattern : /^\+\d*$/,
            minNumLength : 8,
            maxNumLength : 17
        }, settings);

        function validationOk(context) {
            alert('Correct number');
            context.removeClass().css("border", "3px solid green");
        }

        function validationFail(context) {
            context.removeClass().css("border", "3px solid orange");
        }

        function validate() {
            var inputValue = $(this).val(); 
            var inputValueLength = $(this).val().length;

            if (inputValueLength > params.maxNumLength) {
                $(this).val(inputValue.slice(0, params.maxNumLength + 1));
            }

            if (!params.pattern.test(inputValue)) {
                $(this).val(inputValue.slice(0, inputValueLength - 1));
            } 

            if (inputValueLength > params.minNumLength) {
                validationOk($(this));
            } else {
                validationFail($(this));                
            }
        }

        $(this).on("input", validate);

        $(this).on("paste", function() {
            return false;
        });

        return $(this);
    }
})(jQuery);
