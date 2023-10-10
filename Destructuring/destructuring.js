const obj = {
  name: "Alan",
  age: 23,
  sex: "male",
  hobby: "Coding",
  address: {
    street: "Caemas MaseaC",
    city: "Ca E Mas",
  },
};

// Tranditional Way
let name1, age1, sex1, address1;
name1 = obj.name;
age1 = obj.age;
sex1 = obj.sex;
address1 = obj.address;

// Sample 1
console.log("\n\n--------------- Sample 1 ---------------\n\n");
console.log(name1, age1, sex1, address1); // Alan 23 male { street: 'Caemas MaseaC', city: 'Ca E Mas' }

// Destructuring
let { name, age, sex, address } = obj;

// Sample 2
console.log("\n\n--------------- Sample 2 ---------------\n\n");
console.log(name, age, sex, address); // Alan 23 male { street: 'Caemas MaseaC', city: 'Ca E Mas' }

// Default value in Destructuring
const obj1 = {
  name2: "Alan",
  age2: 23,
  sex2: "male",
  hobby2: "Coding",
  address2: {
    street2: "Caemas MaseaC",
    city2: "Ca E Mas",
  },
};

let { name2, age2, sex2, address2, isMarried = false } = obj1;

// Sample 3
console.log("\n\n--------------- Sample 3 ---------------\n\n");
console.log(name2, age2, sex2, address2, isMarried); // Alan 23 male { street2: 'Caemas MaseaC', city2: 'Ca E Mas' } false

// Change attribute name of object in Destructuring

const obj2 = {
  name3: "Alan",
  age3: 23,
  sex3: "male",
  hobby3: "Coding",
  address3: {
    street3: "Caemas MaseaC",
    city3: "Ca E Mas",
  },
};

// "sex3" change to "gender"
let { name3, age3, sex3: gender, address3 } = obj2;

// Sample 4
console.log("\n\n--------------- Sample 4 ---------------\n\n");
console.log(name3, age3, gender, address3); // Alan 23 male { street3: 'Caemas MaseaC', city3: 'Ca E Mas' }

//  Destructure "name4" and "street4" in "obj3"

const obj3 = {
  name4: "Alan",
  age4: 23,
  sex4: "male",
  hobby4: "Coding",
  address4: {
    street4: "Caemas MaseaC",
    city4: "Ca E Mas",
  },
};

// Declare 2 variables: name4 & street4
// then destructure

let {
  name4,
  address4: { street4 },
} = obj3;

// Sample 5
console.log("\n\n--------------- Sample 5 ---------------\n\n");
console.log(name4, street4); // Alan Caemas MaseaC

// Destructure Array

/**
 * Array actually is an Object
 * arr = {
 *  0: "a",
 *  1: "b",
 *  2: "c",
 *  3: "d",
 * }
 */

const arr = ["a", "b", "c", "d"];

const { 0: item1, 3: item2 } = arr; // item1 will be "a", item2 will be "d"

// Sample 6
console.log("\n\n--------------- Sample 6 ---------------\n\n");
console.log(item1, item2); // a d

const [char1, char2] = arr; // use [] to destructure Array

// Sample 7
console.log("\n\n--------------- Sample 7 ---------------\n\n");
console.log(char1, char2); // a b

// use get any position of Array value, just leave blank for other
// if there is no arr[4], can just give default valur "e"
const [char_1, , , char_4, char_5 = "e"] = arr;

// Sample 8
console.log("\n\n--------------- Sample 8 ---------------\n\n");
console.log(char_1, char_4, char_5); // a d e

// Exchange variable
// Sample 9
// console.log("\n\n--------------- Sample 9 ---------------\n\n");
// let a = "A",
//   b = "B";
// console.log(a, b) // A B

// [b, a] = [a, b]; // ----------------------- Not Working
// console.log(a, b); // B A


// Question 1
// Get index with 2 inside index with 4 of "numbers_1", then put in "n_1" variable
const numbers_1 = [1, 2, 3, 4, ["a", "b", "c", "d"]];

const [, , , , [, , n_1]] = numbers_1;

console.log(n_1); // c


// Question 2
// Get attribute "b" inside index with 4 of "numbers_2", then put in "n_2" variable
const numbers_2 = [1, 2, 3, 4, { a: 1, b: 2, c: 3 }];

const [, , , , { b: n_2 }] = numbers_2;

console.log(n_2); // 2
