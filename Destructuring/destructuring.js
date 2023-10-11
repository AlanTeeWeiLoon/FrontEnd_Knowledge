// ---------- Sample 1 ----------
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

console.log("\n\n--------------- Sample 1 ---------------\n\n");
console.log(name1, age1, sex1, address1); // Alan 23 male { street: 'Caemas MaseaC', city: 'Ca E Mas' }

// -------------------- Destructuring --------------------
// ---------- Sample 2 ----------
let { name, age, sex, address } = obj;

console.log("\n\n--------------- Sample 2 ---------------\n\n");
console.log(name, age, sex, address); // Alan 23 male { street: 'Caemas MaseaC', city: 'Ca E Mas' }

// -------------------- Default value in Destructuring --------------------
// ---------- Sample 3 ----------
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

console.log("\n\n--------------- Sample 3 ---------------\n\n");
console.log(name2, age2, sex2, address2, isMarried); // Alan 23 male { street2: 'Caemas MaseaC', city2: 'Ca E Mas' } false

// -------------------- Change attribute name of object in Destructuring --------------------
// ---------- Sample 4 ----------
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

console.log("\n\n--------------- Sample 4 ---------------\n\n");
console.log(name3, age3, gender, address3); // Alan 23 male { street3: 'Caemas MaseaC', city3: 'Ca E Mas' }

// Destructure "name4" and "street4" in "obj3"
// ---------- Sample 5 ----------
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

console.log("\n\n--------------- Sample 5 ---------------\n\n");
console.log(name4, street4); // Alan Caemas MaseaC

// -------------------- Destructure Array --------------------

/**
 * Array actually is an Object
 * arr = {
 *  0: "a",
 *  1: "b",
 *  2: "c",
 *  3: "d",
 * }
 */

// ---------- Sample 6 ----------
const arr = ["a", "b", "c", "d"];
const { 0: item1, 3: item2 } = arr; // item1 will be "a", item2 will be "d"

console.log("\n\n--------------- Sample 6 ---------------\n\n");
console.log(item1, item2); // a d

// ---------- Sample 7 ----------
const [char1, char2] = arr; // use [] to destructure Array

console.log("\n\n--------------- Sample 7 ---------------\n\n");
console.log(char1, char2); // a b

// use get any position of Array value, just leave blank for other
// if there is no arr[4], can just give default valur "e"

// ---------- Sample 8 ----------
const [char_1, , , char_4, char_5 = "e"] = arr;

console.log("\n\n--------------- Sample 8 ---------------\n\n");
console.log(char_1, char_4, char_5); // a d e

// -------------------- Exchange variable --------------------
// ---------- Sample 9 ----------
// console.log("\n\n--------------- Sample 9 ---------------\n\n");
// let a = "A",
//   b = "B";
// console.log(a, b) // A B

// [b, a] = [a, b]; // ----------------------- Not Working
// console.log(a, b); // B A

// -------------------- Destructure from function params --------------------
// ---------- Sample 10 ----------
const obj5 = {
  name6: "Alan",
  age6: 23,
  sex6: "male",
  hobby6: "Coding",
  address6: {
    street6: "Caemas MaseaC",
    city6: "Ca E Mas",
  },
};

// Tranditional Way
function tran_print(user) {
  console.log("---------- Tranditional Way ----------");
  console.log(user.name6); // Alan
  console.log(user.age6); // 23
  console.log(user.sex6); // male
  console.log(user.hobby6); // Coding
  console.log(user.address6.street6); // Caemas MaseaC
  console.log(user.address6.city6); // Ca E Mas
}

// Destructuring
function print({ name6, age6, sex6, hobby6, address6: { street6, city6 } }) {
  console.log("---------- Destructuring ----------");
  console.log(name6); // Alan
  console.log(age6); // 23
  console.log(sex6); // male
  console.log(hobby6); // Coding
  console.log(street6); // Caemas MaseaC
  console.log(city6); // Ca E Mas
}

console.log("\n\n--------------- Sample 10 ---------------\n\n");
tran_print(obj5);
print(obj5);

// ---------- Sample 11 ----------
// if pass in "undefined" or "null" to "ajax_1" function, destructuring will hit error
// {method = "get", url = "/"} = {}, "{}" is use to prevent error when there is no params pass into the function
function ajax_1({ method = "get", url = "/" } = {}) {
  console.log(method, url);
}

console.log("\n\n--------------- Sample 11 ---------------\n\n");
ajax_1({ method: "post", url: "/xxx/xx/x" }); // post /xxx/xx/x
ajax_1({ method: "post" }); // post /
ajax_1(); // get /

// Question 1
// Get index with 2 inside index with 4 of "numbers_1", then put in "n_1" variable
console.log("\n\n--------------- Question 1 ---------------\n\n");
const numbers_1 = [1, 2, 3, 4, ["a", "b", "c", "d"]];

const [, , , , [, , n_1]] = numbers_1;

console.log(n_1); // c

// Question 2
console.log("\n\n--------------- Question 2 ---------------\n\n");
// Get attribute "b" inside index with 4 of "numbers_2", then put in "n_2" variable
const numbers_2 = [1, 2, 3, 4, { a: 1, b: 2, c: 3 }];

const [, , , , { b: n_2 }] = numbers_2;

console.log(n_2); // 2

// Question 3
console.log("\n\n--------------- Question 3 ---------------\n\n");
// From "obj4" desturcture "name5", then put other attributes inside a new object called "newObj"
const obj4 = {
  name5: "Alan",
  age5: 23,
  sex5: "male",
  hobby5: "Coding",
  address5: {
    street5: "Caemas MaseaC",
    city5: "Ca E Mas",
  },
};

const { name5, ...newObj } = obj4;

console.log(name5); // Alan
console.log(newObj); // {age5: 23, sex5: 'male', hobby5: 'Coding', address5: { street5: 'Caemas MaseaC', city5: 'Ca E Mas' }}

// Question 4
console.log("\n\n--------------- Question 4 ---------------\n\n");
// From "numbers_3" desturcture first two item into variable "a_q4" and "b_q4", then put other items to a new array called "newArr"
const numbers_3 = [1, 2, 3, 4];

const [a_q4, b_q4, ...newArr] = numbers_3;

console.log(a_q4); // 1
console.log(b_q4); // 2
console.log(newArr); // [ 3, 4 ]

// Question 5
console.log("\n\n--------------- Question 5 ---------------\n\n");
// From "book", desturcture the remark "id",  "status" and "content" of second chapter
const book = {
  title: "book title",
  content: "book content",
  chapter: [
    {
      no: 1,
      content: "content 1",
      remark: {
        id: 1,
        status: "Yes",
      },
    },
    {
      no: 2,
      content: "content 2",
      remark: {
        id: 2,
        status: "No",
      },
    },
  ],
};

const {
  chapter: [
    ,
    // destructure "chapter", is an Array
    // leave first object item empty
    {
      // destructure second object item
      content, // get content
      remark: { id, status }, // destructure "remark" is an object, then get "id" and "status"
    },
  ],
} = book;

console.log(content); // content 2
console.log(id); // 2
console.log(status); // No
