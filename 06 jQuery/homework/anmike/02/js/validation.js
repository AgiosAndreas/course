'use strict';

(function($) {

  $.fn.phoneValidation = function(options) {

    let settings = $.extend({
      onValidation: function() {},
      minLength: 8,
      maxLength: 17,
      pattern: /^\+\d*$/,
      symbol: "+"
    }, options);

    let currentValue = settings.symbol;
    let validationChecker = 0;

    this.on("input", function() {
      let newValue = $(this).val();

      if (settings.pattern.test(newValue) && newValue.length < settings.maxLength) {
        validationChecker = 0;
        currentValue = newValue;
        $(this).val(newValue);
        if (newValue.length > settings.minLength) {
          validationChecker = 1;
        }
      } else {
        $(this).val(currentValue);
      }

      if ($.isFunction(settings.onValidation)) {
        settings.onValidation.call(this, validationChecker);
      }
    });
    return this;
  };

}(jQuery));
