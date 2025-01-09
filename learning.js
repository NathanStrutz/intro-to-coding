let cl = console.log;

// 8
cl("Hello World!");

// 9
//
//
//
//
//
//
//
//
//
//
//
//
console.log("Nathan " + "Strutz");
console.log("123-555-1234");
console.log(123 - 555 - 1234);

// 10 Trees
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
cl("Tree # 1");
for (let i = 1; i < 8; i++) {
  cl("#".repeat(i));
}
cl("#");
cl("");

cl("Tree # 2");
for (let i = "#"; i.length < 8; i += "#") {
  cl(i);
}
cl("#");

// 11 Loops and functions - Christmas tree
//
//
//
//
//
//
//
//
//
//
//
//

cl("Tree with a function");
let tree = function (size) {
  for (let i = 1; i < size; i++) {
    cl("#".repeat(i));
  }
  cl("#");
};
cl("");
tree(12);
cl("");
tree(5);
cl("");

// 11 Full Christmas tree
//
//
//
//
//
//
//
//
//
//
//
//

let tree2D = function (size) {
  let spaces = " ".repeat(size);
  let branch = "#";
  for (let i = 1; i <= size; i++) {
    cl(spaces+branch);
    branch += "##";
    spaces = spaces.substring(1)
  }
  cl(" ".repeat(size) + "#");
};
cl("");
tree2D(4);
cl("");



// 12 FizzBuzz
//
//
//
//
//
//
//
//
//
//
//
//
for (let i = 1; i <= 100; i++) {
  if (i % 15 === 0) {
    cl("FizzBuzz");
  } else if (i % 3 === 0) {
    cl("Fizz");
  } else if (i % 5 === 0) {
    cl("Buzz");
  } else {
    cl(i);
  }
}

cl("")

cl([...Array(100)].map((_,v)=>(v%3?"":"Fizz")+(v%5?"":"Buzz")||v));


// 12 Math functions
//
//
//
//
//
//
//
//
//
//
//
//
let add = function (a, b) {
  return a + b;
};
let subtract = function (a, b) {
  return a - b;
};
let multiply = function (a, b) {
  return a * b;
};
let divide = function (a, b) {
  return a / b;
};
// tests
cl("add", add(1, 2) === 3);
cl("add", add(10, 15) === 25);
cl("subtract", subtract(10, 15) === -5);
cl("subtract", subtract(15, 10) === 5);
cl("multiply", multiply(5, 10) === 50);
cl("divide", divide(15, 5) === 3);


let o = {
  name: "Nathan",
  age: 100
};

o.age = 200;
let key = "age";
cl(o[key]);

console.table(o);
