import { cl, title, prompt, bigTitle } from "./util.js";
bigTitle("Chapter 2: Play with variables");
{
  title("Improved hello");
  // Write a program that asks the user for his first name and his last name. The program then displays them in one sentence.
}
{
  title("Final values");
  // Observe the following program and try to predict the final values of its variables.
  // should be 2 10 102 30 40 10 10
}

{
  title("Tax calculation");
  // Write a program that asks the user for a raw price. After that, it calculates the corresponding
  // final price using a VAT rate of 20.6 %
}

{
  title("C to F converter");
  // Write a program that asks for a temperature in Celsius degrees, then displays it in Fahrenheit degrees.
  // The conversion between scales is given by the formula: [°F] = [°C] x 9/5 + 32
}

{
  title("Variable swapping");
  // Add the necessary code to swap the values of variables number1 and number2.
  let number1 = 5;
  let number2 = 3;
  // type your code here (and nowhere else!)

  // /end
  cl("Should be 3:", number1);
  cl("Should be 5:", number2);
}
