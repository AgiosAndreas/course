"use strict";

$(function() {
  $("#inputSuccess1").phoneValidation({
    onValidation(validPhone) {
      var color = validPhone ? "#32CD32" : "#FA8072";
      $(this).css("color", color).css("border-color");
    }
  });

  let oldButtonStatus = false;
  $("#inputSuccess2").phoneValidation({
    onValidation(validPhone) {
      if (validPhone != oldButtonStatus) {
        $("#inputSuccess2").parent().toggleClass("has-success");
        $(":button").toggleClass("btn-info");
        oldButtonStatus = validPhone;
      }
    }
  });
});
