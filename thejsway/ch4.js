import { cl, title, bigTitle, prompt } from "./util.js";
bigTitle("Chapter 4: Repeat statements");
{
  title("Carousel");
  // Write a program that launches a carousel for 10 turns, showing the turn number each time.
  // When it’s done, improve it so that the number of turns is given by the user.
}
{
  title("Parity");
  // Check the following program that shows even numbers (divisible by 2) between 1 and 10.
  for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
      cl(`${i} is even`);
    }
  }
  // This program uses the modulo operator %, which calculates the remainder after division of one number by another. It's often used to assess number parity.
  cl(10 % 2); // 0 because 10 = 5 * 2 + 0
  cl(11 % 2); // 1 because 11 = 5 * 2 + 1
  cl(18 % 3); // 0 because 18 = 3 * 6 + 0
  cl(19 % 3); // 1 because 19 = 3 * 6 + 1
  cl(20 % 3); // 2 because 20 = 3 * 6 + 2
  // Improve the program so that it also shows odd numbers. Improve it again to replace the initial number 1 by a number given by the user.
  // This program must show exactly 10 numbers including the first one, not 11 numbers!
}
{
  title("Input validation");
  // Write a program that continues to ask the user for a number until the entered number is less than or equal to 100.
  // When you are done with the above, improve the program so that the terminating number is between 50 and 100.
}
{
  title("Multiplication table");
  // Write a program that asks the user for a number, then shows the multiplication table for this number.
  // When you are done, improve the program so it only accepts numbers between 2 and 9 (use the previous exercise as a blueprint)
}
{
  title("Neither yes nor no");
  // Write a program that plays "neither yes, nor no" with the user. Specifically, the program asks the
  // user to enter text until either "yes" or "no" is typed, which ends the game.
}
{
  title("FizzBuzz");
  // Write a program that shows all numbers between 1 and 100 with the following exceptions:
  //   - It shows "Fizz" instead if the number is divisible by 3.
  //   - It shows "Buzz" instead if the number is divisible by 5 and not by 3.
  // When it's done, improve it so that the program shows "FizzBuzz" instead for numbers divisible both by 3 and by 5.
  // This exercise has many, many solutions. It's a job interview classic that a significant number of candidates fail. Try your best!
}
