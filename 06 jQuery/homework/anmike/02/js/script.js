"use strict";

$(function() {
  let phoneValid = $("#inputSuccess1").phoneValidation();
  if (!phoneValid) {
    $("#this").parents().removeClass(".has-success");
  }
  });
