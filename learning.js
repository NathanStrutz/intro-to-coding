// 8
console.log("Hello World!");

// 9
console.log("Nathan " + "Strutz");
console.log("123-555-1234");
console.log(123 - 555 - 1234);

// 10 Trees
let cl = console.log;
let tree = function () {
  // half tree
  let branches = "#";
  for (let index = 0; index < 7; index++) {
    cl(branches);
    branches += "#";
  }
  cl("#");
};
let fullTree = function () {
  // full tree
  console.log("");
  let branches = "#";
  let leftSpace = " ".repeat(6);
  for (let index = 0; index < 5; index++) {
    cl(leftSpace + branches);
    branches += "##";
    leftSpace = " ".repeat(5 - index);
  }
  cl("     ##");
};
cl("");

// 11 Loops and functions
let christmasTree = function (height) {
  let branches = "#";
  for (let index = 0; index < height; index++) {
    console.log(branches);
    branches += "#";
  }
  console.log("#");
};
christmasTree(7);
christmasTree(75);

// 12 FizzBuzz
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

// 12 Math functions
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
cl("add", add(1, 2) == 3);
cl("add", add(10, 15) == 25);
cl("subtract", subtract(10, 15) == -5);
cl("subtract", subtract(15, 10) == 5);
cl("multiply", multiply(5, 10) == 50);
cl("divide", divide(15, 5) == 3);
