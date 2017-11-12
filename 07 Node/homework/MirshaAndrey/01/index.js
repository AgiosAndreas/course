"use strict";

function flatten(data) {
    return Array.isArray(data) ? data.reduce((result, array) => {
        return result.concat(array)
    }, []) : data
}

console.log(flatten(null));
console.log(flatten('null'));
console.log(flatten([]));
console.log(flatten([1, 2, 3]));
console.log(flatten([[1, 2, 3], ["a", "b", "c"], [4, 5, 6]]));
console.log(flatten([[[1, 2, 3]]]));
