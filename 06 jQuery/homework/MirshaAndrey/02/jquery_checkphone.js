(function($) {

    $.fn.checkPhoneForm = function(options) {
        options = $.extend({
            minLength: 9,
            maxLength: 17,
            format: /^(\+([0-9])*)$/,
            CharPlus: '+',
        }, options);

        this.prop('maxlength', options.maxLength);
        this.on('change keyup input', function() {
            var phone = this.value;

            if (options.format.test(phone) || (
                    this.value = phone = 1 < phone.length ? options.CharPlus + phone.replace(/\D/g, '') : ''))

                var inpLength = 9;
            if (inpLength < $('input').val().length) {
                $('input').css("background-color", "#0cfa00");
            } else {
                $('input').css("background-color", "#ff3d3d");
            }
        });
    };
}(jQuery));