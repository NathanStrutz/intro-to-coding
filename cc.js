// CC = Card Collector
cl = console.log;
let games = [];

let gamesToPlay = 10000;
let uniqueCards = 100;
let buyPack = function () {
  return Math.ceil(Math.random() * uniqueCards);
};

// new game
for (let game = 0; game < gamesToPlay; game++) {
  let purchases = 0;
  let myCollection = new Set();
  while (myCollection.size < uniqueCards) {
    purchases++;
    let newCard = buyPack();
    myCollection.add(newCard);
  }
  games.push(purchases);
}

cl(games.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / gamesToPlay);
