cl = console.log;
let prompt = require("prompt-sync")({ sigint: true });

let getUserInput = function () {
  let userInput = "";
  if (process.argv.length > 2) {
    userInput = process.argv[2];
  } else {
    userInput = prompt("What's your name? ").trim();
  }
  return userInput;
};

let name = getUserInput();
cl(`Hello, ${name}!`);
