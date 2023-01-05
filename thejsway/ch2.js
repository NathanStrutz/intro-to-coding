cl = console.log;
let prompt = require("prompt-sync")({ sigint: true });

{
  // Write a program that asks the user for his first name and his last name.The program then displays them in one sentence.
  let name = "Nathan"; //prompt("What's your name?");
  cl("Hello, " + name + "! how are you today?");
}
// Observe the following program and try to predict the final values of its variables.
{
  let a = 2;
  a -= 1;
  a++;
  let b = 8;
  b += 2;
  const c = a + b * b;
  const d = a * b + b;
  const e = a * (b + b);
  const f = (a * b) / a;
  const g = (b / a) * a;
  console.log(a, b, c, d, e, f, g);
  // should be 2 10 102 30 40 10 10
}

{
  // Write a program that asks the user for a raw price. After that, it calculates the corresponding
  // final price using a VAT rate of 20.6 %

  let price = 100;
  let tax = 20.6;
  let taxPct = tax / 100;
  let vat = price * taxPct;
  cl("Total price", price + vat);
}

{
  // Write a program that asks for a temperature in Celsius degrees, then displays it in Fahrenheit degrees.
  // The conversion between scales is given by the formula: [°F] = [°C] x 9/5 + 32

  let cToF = function (c) {
    return Math.round(c * (9 / 5) + 32);
  };
  let fToC = function (f) {
    return Math.round((f - 32) / (9 / 5));
  };
  cl("31 C to F is", cToF(31));
  cl("72 F to C is", fToC(72));
}

{
  let number1 = 5;
  let number2 = 3;
  // type your code here (and nowhere else!)
  let tmp = number2;
  number2 = number1;
  number1 = tmp;
  // /end
  console.log(number1); // Should show 3
  console.log(number2); // Should show 5
  // Add the necessary code to swap the values of variables number1 and number2.
}
