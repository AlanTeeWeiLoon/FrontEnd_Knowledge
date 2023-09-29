// Question 1 - prototype
console.log("\n\n---------- Question 1 ---------\n\n");

// How to get the contrusted function name that create "obj"?
function A() {}
function B() {}

function create() {
  if (Math.random() < 0.5) {
    return new A();
  } else {
    return new B();
  }
}

var obj = create();

// Ans:
console.log(obj, "=", obj.__proto__.constructor.name);


// Question 2 - For loop with shift()
console.log("\n\n---------- Question 2 ---------\n\n");

const arrQues = [1, 2, 3, 4, 5];

for (const item of arrQues) {
  // console.log(item) // 1 => 3 => 5 (Uncomment to check)
  arrQues.shift();
}

// console.log(arrQues) // [ 4, 5 ] (Uncomment to check)

// A. Why will "item" in for loop will be "1 => 3 => 5", instead of "1 => 2 => 3 => 4 => 5"?
// B. Why will arrQues still got value [4, 5] instead of [] after loop with shift()?
// C. How to solve this issue?

// Ans:
// A. First console.log(item) will be "1", but when execute arrQues.shift(), "1" had been removed,
//    so the 'Current' item will direct point to "2". Then next loop will not be "2", will move to "3".
//    So, second console.log(item) will log out "3", then execute arrQues.shift() again, "Current" item will become "4".
//    Then next loop will be "5", then third console.log(item) will be "5"
//
// B. As explanation in (A), which means that the looping will only 3 times,
//    so will only execute arrQues.shift() 3 times, so remaining item in "arrQues" will be [4, 5]
// C.
const arrAns = [1, 2, 3, 4, 5];

while (arrAns[0]) {
  console.log(arrAns[0]); // 1 => 2 => 3 => 4 => 5
  arrAns.shift();
}

console.log(arrAns); // []
