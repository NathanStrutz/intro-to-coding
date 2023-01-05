cl = console.log;
let prompt = require("prompt-sync")({ sigint: true });

{
  // Write a program that launches a carousel for 10 turns, showing the turn number each time.
  // When it’s done, improve it so that the number of turns is given by the user.
  cl("--------");
  cl("Carousel");
  let carousel = [1, 2, 3];
  let turnCount = 10;
  let currentTurn = 0;
  for (let i = 0; i < turnCount; i++) {
    cl(carousel[currentTurn]);
    currentTurn++;
    if (currentTurn >= carousel.length) {
      currentTurn = 0;
    } else {
    }
  }
  cl("--------");
}
{
  // Improve the program so that it also shows odd numbers.
  // Improve it again to replace the initial number 1 by a number given by the user.
  // This program must show exactly 10 numbers including the first one, not 11 numbers!
  cl("--------");
  let batchString = "Evens\n";
  for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
      batchString += `${i} is even\n`;
    }
  }
  cl(batchString);
  batchString = "Odds\n";
  for (let i = 1; i <= 10; i++) {
    if (i % 2 !== 0) {
      batchString += `${i} is odd\n`;
    }
  }
  cl(batchString);
  let loopModulo = function (start = 1, end = 10, mod = 2) {
    let batchString = `Modulous looping from ${start} to ${end} and matching based on mod ${mod}.\n`;
    for (let i = start; i <= end; i++) {
      if (i % mod === 0) {
        batchString += `${i} is a match\n`;
      }
    }
    cl(batchString);
  };
  loopModulo(10, 25, 3);

  let loopModuloUntil = function (start = 1, matches = 10, mod = 2) {
    let batchString = `Modulous looping from ${start}, matching ${matches} matches, based on mod ${mod}.\n`;
    let i = start;
    while (batchString.split("\n").length <= matches + 1) {
      if (i % mod === 0) {
        batchString += `${i} is a match\n`;
      }
      i++;
    }
    cl(batchString);
  };
  loopModuloUntil(15, 7, 5);
  loopModuloUntil();
  cl("--------");
}
{
  // Write a program that continues to ask the user for a number until the entered number is less than or equal to 100.
  // When you are done with the above, improve the program so that the terminating number is between 50 and 100.

  let compareNumber = function (input, number = 100) {
    if (input < number) {
      cl(`Your number is less than ${number}`);
    } else if (input > number) {
      cl(`Your number is greater than ${number}`);
    } else {
      cl(`Your number is ${number}`);
    }
  };
  compareNumber(25);
  compareNumber(50);
  compareNumber(100);
  compareNumber(999);

  compareNumber(25, 50);
  compareNumber(50, 50);
  compareNumber(100, 50);
  compareNumber(999, 50);
}
{
  // Write a program that asks the user for a number, then shows the multiplication table for this number.
  // When you are done, improve the program so it only accepts numbers between 2 and 9 (use the previous exercise as a blueprint)
  let multiplicationTable = function (num) {
    if (num < 1 || num > 9) {
      cl("Sorry, only number from 1-9 are valid for the mulitiplication table");
      return;
    }
    let tbl = [];
    for (let i = 0; i <= 12; i++) {
      tbl.push(i * num);
    }
    console.log("Multiplication Table for", num);
    console.table(tbl);
  };
  multiplicationTable(3);
  multiplicationTable(12);
}
{
  // Write a program that plays “neither yes, nor no” with the user. Specifically, the programs asks
  // the user to enter text until either “yes” or “no” is typed, which ends the game.
  while (true) {
    if (["yes", "no"].includes(prompt("enter yes or no: ").toLowerCase())) {
      break;
    }
  }
}
{
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
}
