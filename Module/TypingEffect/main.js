console.log("\n\n---------- Typing Effect ---------\n\n")

const config = require("./config")
const delay = require("./delay")
const print = require("./print")

async function run(){
    let index = 0
    while(index < config.text.length){
        print(index)
        await delay(config.wordDuration)
        index++
    }
}  

run()