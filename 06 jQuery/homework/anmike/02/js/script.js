"use strict";

$(function() {
  $("#inputSuccess1").phoneValidation({
    onValidation(validPhone) {
      $(this).css({
        "color": "red",
        "border-color": "red"
      });
      if (validPhone) {
        $(this).css({
          "color": "green",
          "border-color": "green"
        });
      }
    }
  });

  $("#inputSuccess2").phoneValidation({
    onValidation(validPhone) {
      $("#inputSuccess2").parent().removeClass("has-success");
      $("#inputSuccess2").siblings().removeClass("btn-info");
      if (validPhone) {
        $("#inputSuccess2").parent().addClass("has-success");
        $("#inputSuccess2").siblings().addClass("btn-info");
      }
    }
  });

});
