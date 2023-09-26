const config = require("./config")

/**
 * @param {Number} index 
 */

const print = index =>{
    console.clear()
    const txt = config.text.substring(0, index + 1)
    console.log(txt)
}

module.exports = print