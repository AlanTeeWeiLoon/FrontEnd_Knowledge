// Question 1 - prototype

// How to get the contrusted function name that create "obj"?
function A(){}
function B(){}

function create(){
    if(Math.random()<0.5) {
        return new A()
    } else {
        return new B()
    }
}

var obj = create()

// Ans: 
console.log(obj, "=", obj.__proto__.constructor.name)