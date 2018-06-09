"use strict";

function flatten(data) {

    return Array.isArray(data) ? data.reduce((result, array) => {
    return result.concat(array);
    }, []) : data;
}

function totalFlatten(data) {
   
    if (!Array.isArray(data)) {
        return data;
    } 
    else {
    	var newarr = [];
        while (data.some(Array.isArray)) {
            data = newarr.concat(flatten(data));
        }
    } 
    return data;
}

console.log(flatten(null));
console.log(flatten("null"));
console.log(flatten([]));
console.log(flatten([1,2,3]));
console.log(flatten([[1,2,3],["a","b","c"],[4,5,6]]));
console.log(flatten([[[1,2,3]]]));

//test for totalFlatten
console.log(totalFlatten(null));
console.log(totalFlatten('null'));
console.log(totalFlatten([]));
console.log(totalFlatten([[1,2,3],["a","b","c"], [4,5,6]]));
console.log(totalFlatten([[[1,2,3]]]));