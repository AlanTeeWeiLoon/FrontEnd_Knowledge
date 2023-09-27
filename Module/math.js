// this file is use to provide some math related function

console.log("In math.js") // In math.js
// will log out if first time execute this file or cache removed

const isOdd = (n) => {
    return n % 2 !== 0
}

const sum = (a, b) => {
    return a + b
}

// export to other module to use
module.exports = {
    isOdd,
    sum
}