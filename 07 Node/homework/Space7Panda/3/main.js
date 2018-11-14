"use strict";
let Bruter = require('./brute.js')
let path = process.argv[2];

let sha256 = new Bruter;

sha256.bruteCatalog(path);