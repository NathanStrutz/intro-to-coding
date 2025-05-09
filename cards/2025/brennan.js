let cl = console.log;

for (let i = 2; i <= 14; i++) {
  let name = i;
  if (i === 11) {
    name = "Jack";
  } else if (i === 12) {
    name = "Queen";
  } else if (i === 13) {
    name = "King";
  } else if (i === 14) {
    name = "Ace";
  }
  let card = {
    rank: i,
    suit: "Hearts",
    color: "red",
    name: name,
  };
  console.log(`The ${card.name} of ${card.suit} is ranked ${card.rank}`);
}

let buildDeck = function () {
  let deck = [];
  for (let i = 2; i <= 14; i++) {
    deck.push(createCard(i, "Spades"));
    deck.push(createCard(i, "Hearts"));
    deck.push(createCard(i, "Clubs"));
    deck.push(createCard(i, "Diamonds"));
  }
  return deck;
};
let createCard = function (rank, suit) {
  return {
    rank: rank,
    suit: suit,
    color: getColor(suit),
    name: getName(rank),
  };
};
let getName = function (rank) {
  switch (rank) {
    case 11:
      return "Jack";
    case 12:
      return "Queen";
    case 13:
      return "King";
    case 14:
      return "Ace";
    default:
      return rank;
  }
};
let getColor = function (suit) {
  if (suit === "Hearts" || suit === "Diamonds") {
    return "red";
  } else {
    return "black";
  }
};
let deck = buildDeck();
console.table(deck);
let dealHand = function (deck) {
  return [dealCard(deck), dealCard(deck), dealCard(deck), dealCard(deck), dealCard(deck)];
};
let dealCard = function (deck) {
  let randomNumber = Math.floor(Math.random() * deck.length);
  return deck.splice(randomNumber, 1)[0];
};

// -- tests!
// console.table(createCard(11, "Clubs"));
// console.log(getColor("Hearts"));
// console.log(getName(11));
// console.log("The deck has ", deck.length, "cards");
// console.log(dealHand(deck));
// console.log("The deck has ", deck.length, "cards");

// let hand1 = dealHand(deck);
// let hand2 = dealHand(deck);
// let hand3 = dealHand(deck);

let createPlayer = function (name) {
  return {
    name: name,
    hand: [],
    wins: 0,
  };
};

let player1 = {
  name: "Melissa",
  hand: dealHand(deck),
  wins: 0,
};

let player2 = {
  name: "Kendall",
  hand: dealHand(deck),
  wins: 0,
};

let player3 = {
  name: "James",
  hand: dealHand(deck),
  wins: 0,
};

let sortByRank = function (hand) {
  hand.sort(function (a, b) {
    return a.rank - b.rank;
  });
};

cl(player1);
cl(player2);
cl(player3);

sortByRank(player1.hand);
let highestCard = player1.hand[player1.hand.length - 1];
let lowestCard = player1.hand[0];

let getWinner = function (players) {
  let highestCard = -1;
  let winner = null;
  players.forEach(function (player) {
    let highestPlayerCard = player.hand[player.hand.length - 1];
    if (highestPlayerCard.rank > highestCard) {
      highestCard = highestPlayerCard.rank;
      winner = player;
    }
  });
  return winner;
};

let players = [player1, player2, player3];

let winner = getWinner(players);

cl(`The winner is ${winner.name} with the ${winner.hand[winner.hand.length - 1].name} of ${winner.hand[winner.hand.length - 1].suit}.`);

let calculateHandSum = function (hand) {
  return hand.reduce(function (total, card) {
    return total + card.rank;
  }, 0);
};

let highestSum = 0;
players.forEach(function (player) {
  let handSum = calculateHandSum(player.hand);
  if (handSum > highestSum) {
    highestSum = handSum;
    winner = player;
  }
});

cl(`${winner.name} shouts "Domination!"`);
cl(`${winner.name} wins with a total sum of ${calculateHandSum(winner.hand)}.`);
