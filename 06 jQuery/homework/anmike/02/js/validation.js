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

    return this.each(function() {
      let $this = $(this);
      let currentValue = settings.symbol;
      let validationChecker = false;

      $this.on("input", function() {
        let newValue = $this.val();
        if (settings.pattern.test(newValue) && newValue.length <= settings.maxLength) {
          currentValue = newValue;
          $this.val(newValue);
          validationChecker = newValue.length > settings.minLength;
          settings.onValidation.call(this, validationChecker);
        } else {
          $this.val(currentValue);
        };
      });
    });
  };

}(jQuery));
