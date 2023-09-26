// index.js is an initial file, its run through node command
// to run this file make sure node js is installed, then open a terminal, then run "node index.js"

// import from math.js
const maths = require("./math") 
// will execute and run whole math.js file once
// return {isOdd: fn, sum: fn}


console.log("\n\n---------- Sample 1 ---------\n\n")
// After import then able to use the functions in math.js
console.log(maths.sum(1,2)) // 3
console.log(maths.isOdd(1)) // true
console.log(maths.isOdd(20)) // false

/* 

Module got cache, first execute will store export result in cache
after that use the module again, will direct use cache result

*/

console.log("\n\n---------- Sample 2 ---------\n\n")

require("./math") // will not execute again, because of cache
require("./math") // will not execute again, because of cache
require("./math") // will not execute again, because of cache








