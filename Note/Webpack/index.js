require('./moduleA') 
require('./moduleB') 
// dependent of "moduleA" & "moduleB"-> "moduleA" dependent of "moduleB"
// so index.js, moduleA.js, moduleB.js can count as a chunk