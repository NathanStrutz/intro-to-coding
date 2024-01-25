let cl = console.log;

let montyHall = function() {
    let doors = [0,1,2];
    let carDoor = Math.floor(Math.random() * 3);
    let firstGuess = Math.floor(Math.random() * 3);
    // let goatDoor = doors.find(function(v){ return v !== firstGuess && v !== carDoor });
    let goatDoor = doors.find((v) => v !== firstGuess && v !== carDoor);
    let secondGuess = doors.find((v) => v !== firstGuess && v !== goatDoor);
    return secondGuess === carDoor;
}



for (let i = 0; i < 1000; i++) {
    cl( montyHall() )
}

