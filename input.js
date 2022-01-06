// let prompt = require("prompt");
// prompt("Please state the nature of the medical emergency.", (input) => {
//   console.log("You said:", input);
// });

let startArgs = process.argv.slice(0, 2);
let cmdArgs = process.argv.slice(2);
console.log(startArgs, cmdArgs);

let choice = process.argv[2];
if (choice !== "rock" && choice !== "paper" && choice !== "scissors") {
  console.log("You must enter rock, paper, or scissors.");
  return;
}

console.log("You chose " + choice);
