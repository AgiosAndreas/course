"use strict";
const G = require('generatorics');
const sha256 = require('js-sha256');
const fs = require('fs');

let path = 'hashes';

fs.readdir(path, 'utf-8', function (err, dirFiles) {
  if (err) {
    return console.log(err)
  }

  for (var i = 0; i < dirFiles.length; i++) {
    fileProcessing(path, dirFiles[i]);
  }
})

function  fileProcessing(path, fileName) {
  fs.readFile(path + "//" + fileName, "utf8", function(err, content){
    if (err) {
      return console.log(err)
    }

    bruteSha256(content);
  })
}

function bruteSha256(content) {

  content = content.split(" ");
  let code = content[0];
  let letters = content[1].split("");

  for (var perm of G.permutation(letters)) {

    let word = perm.join("");
    let encodedWord = sha256(word);

    if (encodedWord == code) {
      console.log("success");
      console.log(word);
      console.log(encodedWord);

      return word;
    }
  }
}

module.exports = bruteSha256;