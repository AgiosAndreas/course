"use strict";
let flatten      = require('./flatten.js');
let totalFlatten = require('./totalFlatten.js');

console.log(flatten(null));
console.log(flatten("null"));
console.log(flatten([]));
console.log(flatten([1,2,3]));
console.log(flatten([[1,2,3],["a","b","c"],[4,5,6]]));
console.log(flatten([[[1,2,3]]]));

console.log(totalFlatten(null));
console.log(totalFlatten('null'));
console.log(totalFlatten([]));
console.log(totalFlatten([[1,2,3],["a","b","c"], [4,5,6]]));
console.log(totalFlatten([[[1,2,3]]]));