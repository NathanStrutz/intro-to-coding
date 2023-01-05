cl = console.log;
let prompt = require("prompt-sync")({ sigint: true });
let title = (str) => cl(`${"-".repeat(str.length)}\n${str}\n${"-".repeat(str.length)}`);

{
  // Complete the following program so that it asks the user for his first and last names, then show the result of the sayHello() function.
  // Say hello to the user
  function sayHello(firstName, lastName) {
    const message = `Hello, ${firstName} ${lastName}!`;
    return message;
  }
  cl(sayHello("Nathan", "Strutz"));
}
{
  title("Squares");
  // Complete the following program so that the square1() and square2() functions work properly.
  // Square the given number x
  function square1(x) {
    return x * x;
  }
  // Square the given number x
  const square2 = square1;
  cl(square1(0), "Must show 0");
  cl(square1(2), "Must show 4");
  cl(square1(5), "Must show 25");
  cl(square2(0), "Must show 0");
  cl(square2(2), "Must show 4");
  cl(square2(5), "Must show 25");
  for (let i = 0; i < 11; i++) {
    cl("Square of", i, "is", square2(i));
  }
}
{
  title("My own min function");
  // Let’s pretend the JavaScript Math.min() function doesn’t exist. Complete the following program so that the min() function returns the minimum of its two received numbers.
  let min = function (a, b) {
    return a < b ? a : b;
  };
  console.log(min(4.5, 5), "Must show 4.5");
  console.log(min(19, 9), "Must show 9");
  console.log(min(1, 1), "Must show 1");
}
{
  title("Calculator");
  // Complete the following program so that it offers the four basic arithmetical operations: addition,
  // subtraction, multiplication and division. You can use either a function declaration or a function expression.

  let calculate = function (a, oper, b) {
    return eval(a + oper + b);
  };
  console.log(calculate(4, "+", 6), "Must show 10");
  console.log(calculate(4, "-", 6), "Must show -2");
  console.log(calculate(2, "*", 0), "Must show 0");
  console.log(calculate(12, "/", 0), "Must show Infinity");
}
{
  title("Circle Calculation");
  // Write a program containing two functions to calculate the circumference and area of a circle defined by its radius. Test it using user input.

  let circumference = (rad) => 2 * Math.PI * rad;
  let circleArea = (rad) => Math.PI * rad ** 2;

  cl(`When the radius is 5, the circumference is`, circumference(5));
  cl(`When the radius is 5, the area is`, circleArea(5));
}
