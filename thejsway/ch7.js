cl = console.log;
let prompt = require("prompt-sync")({ sigint: true });
let title = (str) => cl(`${"-".repeat(str.length)}\n${str}\n${"-".repeat(str.length)}`);

{
  title("Musketeers");
  // Write a program that:
  // • Creates an array named musketeers containing values “Athos”, “Porthos” and “Aramis”.
  // • Shows each array element using a for loop.
  // • Adds the “D’Artagnan” value to the array.
  // • Shows each array element using the forEach() method.
  // • Remove poor Aramis.
  // • Shows each array element using a for-of loop
  let musketeers = ["Athos", "Porthos", "Aramis"];
  for (let m = 0; m < musketeers.length; m++) {
    const man = musketeers[m];
    cl(man);
  }
  cl("----------");
  musketeers.push("D’Artagnan");
  musketeers.forEach((n) => cl(n));
  cl("----------");
  musketeers.splice(2, 1);
  for (const man of musketeers) {
    cl(man);
  }
}
{
  title("Array sum");
  // Write a program that creates the following array, then calculates and shows the sum of its values
  const values = [3, 11, 7, 2, 9, 10];
  cl(
    values.reduce((a, b) => a + b, 0),
    "Should be 42"
  );
}
{
  title("Array max");
  // Write a program that creates the following array, then calculates and shows the array's maximum value.
  const values = [3, 11, 7, 2, 9, 10];
  cl(
    values.reduce((a, b) => Math.max(a, b), 0),
    "Should be 11"
  );
}
{
  title("Stop at 'stop'");
  // Write a program that asks the user for a word until the user types "stop". The program then
  // shows each of these words, except "stop".

  let words = ["I", "can't", "believe", "it's", "not", "stop", "butter"];
  for (const w of words) {
    if (w.toLowerCase() === "stop") {
      break;
    }
    cl(w);
  }
}
