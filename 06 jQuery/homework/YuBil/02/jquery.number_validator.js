/*
    The plugin may take the following params:
    - pattern (regExp): check the syntax;
    - minNumLength (number): minimum number of characters;
    - maxNumLength (number): maximum number of characters;
    - isValid (boolean): is field valid by default;
    - onValidation (function): callback; 
*/
(function($) {
    
    $.fn.phoneNumberValidator = function(settings) {
        var params = $.extend({
            pattern : /^\+\d*$/,
            minNumLength : 8,
            maxNumLength : 17,
            isValid: false,
            onValidation: () => {    
                if (params.isValid) {
                    $(this).removeClass().css("border", "3px solid green");        
                } else {
                    $(this).removeClass().css("border", "3px solid orange");        
                }
            }
        }, settings);

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
                params.isValid = true; 
            } else {
                params.isValid = false;
            }

            params.onValidation.call(this);
        }

        $(this).on("input", validate);

        $(this).on("paste", function() {
            return false;
        });

        return $(this);
    }
})(jQuery);
