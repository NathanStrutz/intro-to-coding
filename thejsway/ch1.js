const cl = console.log;
{
  // 1. Presentation
  // Write a program that displays your name and age. Here’s the result for mine.
  cl("Nathan");
  cl(new Date().getFullYear() - new Date("1979-01-01T14:06:37").getFullYear());
}

{
  // Minimalistic calculator
  // Write a program that displays the results of adding, subtracting, multiplying and dividing 6 by 3.
  cl("Add: ", 6 + 3);
  cl("Subtract: ", 6 - 3);
  cl("Multiply: ", 6 * 3);
  cl("Divide: ", 6 / 3);
}

{
  // Values prediction
  // Observe the following program and try to predict the values it displays.
  console.log(4 + 5); // 9
  console.log("4 + 5"); // "4 + 5"
  console.log("4" + "5"); // "45"
}
