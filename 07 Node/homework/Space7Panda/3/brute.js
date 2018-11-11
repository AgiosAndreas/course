"use strict";
let G = require('generatorics');
let sha256 = require('js-sha256');

let code = "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824";
let letters = ['h', 'l', 'e', 'o','l'];

console.log(bruteSha256(code, letters));

function bruteSha256(code, letters) {

  for (var perm of G.permutation(letters)) {

    let word = perm.join("");
    let encodedWord = sha256(word);

    if (encodedWord == code) {
      console.log("success");
      return word;
    }
  }
}