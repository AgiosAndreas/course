'use strict';

(function($) {

  $.fn.phoneValidation = function(options) {

    let settings = $.extend({
      minLength: 8,
      maxLength: 17,
      pattern: /^[0-9]+$/,
      symbol: "+"
    }, options);


    function onKeyPress(e) {
      if (((e.which < 48 || e.which > 57) && e.which != 43) || (this.value.length > settings.maxLength)) {
        e.preventDefault();
        //43 - +

        //let validationChecker = 0;
        //  if (phone.search(settings.pattern) == 0 ) {
        //    validationChecker = 1
        //  }
        //  return validationChecker;
      } else {
        //let newText = String.fromCharCode(e.keyCode);

      };
    };

    function onPaste(e) {

      let pastedText = (e.originalEvent || e).clipboardData.getData('text/plain');
      if (!settings.pattern.test(pastedText)) {
        e.preventDefault();
      } else {

        //var presentText = $(this).val();

        let presentText = $(this).val();
        let freeSpace = settings.maxLength - presentText.length;
        alert(freeSpace);
        if (freeSpace) {
          pastedText = pastedText.slice(0, freeSpace)
            (e.originalEvent || e).clipboardData.setData('text/plain', pastedText);
        } else {
          e.preventDefault();
        }
        //  let finalText = presentText + pastedText;
        //  point = $(this).selectionStart;
        //  alert (point);
        //  alert(presentText + pastedText);
        //  alert (settings.pattern.test(presentText + pastedText));
        //  var result = $(this).val(presentText.slice(0,point) + pastedText + presentText.slice(point));
        //  alert(result);

        //    $(this).val(presentText.slice(0 , settings.maxLength));

      }

      //  checkInput($(this));
      //  $(this).val(presentText + pastedText);
    };

    this.val(settings.symbol);
    this.bind('keypress', onKeyPress).bind('paste', onPaste);
  };

}(jQuery));
