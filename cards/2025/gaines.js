let cl = console.log;
let ct = console.table;

let buildDeck = function () {
  let deck = [];
  for (let i = 1; i <= 13; i++) {
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
    case 1:
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
// ct(deck);

let dealHand = function (deck) {
  return [dealCard(deck)];
};
let dealCard = function (deck) {
  let randomNumber = Math.floor(Math.random() * deck.length);
  return deck.splice(randomNumber, 1)[0];
};

let player1 = {
  name: "Bob",
  hand: dealHand(deck),
  wins: 0,
};

let player2 = {
  name: "Jim",
  hand: dealHand(deck),
  wins: 0,
};

let player3 = {
  name: "Harry",
  hand: dealHand(deck),
  wins: 0,
};

let playGame = function (player1, player2, player3) {
  let p1Card = player1.hand[0];
  let p2Card = player2.hand[0];
  let p3Card = player3.hand[0];

  if (p1Card.rank === 1) {
    cl(`${player1.name} is the winner!`);
  } else if (p2Card.rank === 1) {
    cl(`${player2.name} is the winner!`);
  } else if (p3Card.rank === 1) {
    cl(`${player3.name} is the winner!`);
  } else if (p1Card.rank === 1 && p2Card.rank === 1 && p3Card.rank === 1) {
    cl("Tie game!");
  } else if (p1Card.rank > p2Card.rank && p1Card.rank > p3Card.rank) {
    cl(`${player1.name} is the winner!`);
  } else if (p2Card.rank > p1Card.rank && p2Card.rank > p3Card.rank) {
    cl(`${player2.name} is the winner!`);
  } else if (p3Card.rank > p1Card.rank && p3Card.rank > p2Card.rank) {
    cl(`${player3.name} is the winner!`);
  } else {
    cl("Tie game!");
  }
};

// cl("The deck has", deck.length, "cards");
// cl(dealHand(deck));
// cl("The deck has", deck.length, "cards");
playGame(player1, player2, player3);
// cl("Bob", player1.hand);
// cl("Jim", player2.hand);
// cl("Harry", player3.hand);
