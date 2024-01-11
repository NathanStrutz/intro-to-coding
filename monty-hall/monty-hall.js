let cl = console.log;

let montyHall = function (switchDoor = false) {
  let doors = [0, 1, 2];
  let carDoor = Math.floor(Math.random() * 3);
  let firstGuess = Math.floor(Math.random() * 3);
  let goatDoor = doors.find((door) => door !== carDoor && door !== firstGuess);
  if (switchDoor) {
    let secondGuess = doors.find((door) => door !== goatDoor && door !== firstGuess);
    return secondGuess === carDoor;
  } else {
    // not switching
    return firstGuess === carDoor;
  }
};

stats = {
  runs: 100000,
  wins: 0,
  losses: 0,
};

for (let i = 0; i < stats.runs; i++) {
  if (montyHall(true)) {
    stats.wins++;
  } else {
    stats.losses++;
  }
}

cl(stats);
cl("winning percentage:", (stats.wins / stats.runs) * 100);
