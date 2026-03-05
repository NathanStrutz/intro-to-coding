// Monty Hall - Let's make a deal!

cl = console.log;

let numberOfGames = 10;
let numberOfWins = 0;

for (let i = 0; i <= numberOfGames; i++) {
  let doors = ["goat", "goat", "goat"];

  // monty puts a car behind one of the doors
  let carDoor = Math.floor(Math.random() * 3);
  doors[carDoor] = "car";

  // I'm going to make a guess - the car is behind...
  let myGuess = Math.floor(Math.random() * 3);

  // Monty opens a different door to show a goat
  let goatDoor = doors.findIndex(function (value, index) {
    return index !== carDoor && index !== myGuess;
  });
  doors[goatDoor] = "GOAT";

  // switch doors!
  myGuess = doors.findIndex(function (value, index) {
    return index !== myGuess && index !== goatDoor;
  });

  // did I win?
  if (myGuess === carDoor) {
    numberOfWins++;
  }
}

cl(numberOfWins, "/", numberOfGames);
cl(numberOfWins / numberOfGames);
