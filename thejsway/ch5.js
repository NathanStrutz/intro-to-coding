import { cl, title, bigTitle, prompt } from "./util.js";
bigTitle("Chapter 5: Write functions");
{
  title("Improved hello");
  // Complete the following program so that it asks the user for his first and last names, then show the result of the sayHello() function.
  // Say hello to the user
  function sayHello(firstName, lastName) {
    const message = `Hello, ${firstName} ${lastName}!`;
    return message;
  }

  // TODO: ask user for first and last name
  // TODO: call sayHello() and show its result
}
{
  title("Number squaring");
  // Complete the following program so that the square1() and square2() functions work properly.
  // Square the given number x
  function square1(x) {
    // TODO: complete the function code
  }

  // Square the given number x
  let square2 = (x) => -1; // TODO: complete the function code

  cl(square1(0), "Must show 0");
  cl(square1(2), "Must show 4");
  cl(square1(5), "Must show 25");

  cl(square2(0), "Must show 0");
  cl(square2(2), "Must show 4");
  cl(square2(5), "Must show 25");
}
{
  title("Minimum of two numbers");
  // Let's pretend the JavaScript Math.min() function doesn’t exist. Complete the following program so that the min() function returns the minimum of its two received numbers.
  // TODO: write the min() function
  /*
    cl(min(4.5, 5), "Must show 4.5");
    cl(min(19, 9), "Must show 9");
    cl(min(1, 1), "Must show 1");
  */
}
{
  title("Calculator");
  // Complete the following program so that it offers the four basic arithmetical operations: addition,
  // subtraction, multiplication and division. You can use either a function declaration or a function expression.
  /*
    cl(calculate(4, "+", 6), "Must show 10");
    cl(calculate(4, "-", 6), "Must show -2");
    cl(calculate(2, "*", 0), "Must show 0");
    cl(calculate(12, "/", 0), "Must show Infinity");
  */
}
{
  title("Circumference and area of a circle");
  // Write a program containing two functions to calculate the circumference and area of a circle defined by its radius. Test it using user input.
  // Here are some tips for solving this exercise:
  //  - Circumference and area calculation formulas should be part of your secondary school memories... Or a Google click away :)
  //  - The value of number π (Pi) is obtained with Math.PI in JavaScript.
  //  - You might want to use the exponentiation operator: ** to perform computations.
  // cl(2 ** 3); // 8: 2 * 2 * 2
  // cl(3 ** 2); // 9: 3 * 3
}
