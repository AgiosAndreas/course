"use strict";

function flatten(data) {
    
    return Array.isArray(data) ? data.reduce((result, array) => {
        return result.concat(array);
    }, []) : data;
}

Console.log(flatten(null));
Console.log(flatten("null"));
Console.log(flatten([]));
Console.log(flatten([1, 2, 3]));
Console.log(flatten([[1, 2, 3], ["a", "b", "c"], [4, 5, 6]]));
Console.log(flatten([[[1, 2, 3]]]));
