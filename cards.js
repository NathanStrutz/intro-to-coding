let cl = console.log;
let ct = console.table;

let buildDeck = function () {
  let deck = [];

  for (let i = 2; i < 15; i++) {
    deck.push(createCard(i, "Hearts"));
    deck.push(createCard(i, "Spades"));
    deck.push(createCard(i, "Diamonds"));
    deck.push(createCard(i, "Clubs"));
  }
  return deck;
};

let createCard = function (rank, suit) {
  let card = {
    rank: rank,
    suit: suit,
    color: getColor(suit),
    name: getName(rank),
  };
  return card;
};

let getName = function (rank) {
  if (rank === 11) {
    return "Jack";
  } else if (rank === 12) {
    return "Queen";
  } else if (rank === 13) {
    return "King";
  } else if (rank === 14) {
    return "Ace";
  } else {
    return "" + rank;
  }
};

let getColor = function (suit) {
  if (suit === "Hearts" || suit === "Diamonds") {
    return "red";
  } else {
    return "black";
  }
};

// TESTS

// let color = getColor("Spades");
// cl(color, "should be black");

// let cardName = getName(14);
// cl(cardName, "should be Ace");

// let card = createCard(11, "Hearts");
// console.table(card);

let deck = buildDeck();
// console.table(deck);

let dealCard = function (deck) {
  let randomNumber = Math.floor(Math.random() * deck.length);
  let card = deck.splice(randomNumber, 1)[0];
  return card;
};
let dealHand = function (deck) {
  return [dealCard(deck), dealCard(deck), dealCard(deck), dealCard(deck), dealCard(deck)];
};

// // TESTS
// cl(deck.length);
// ct(dealHand(deck));
// cl(deck.length);

let player1 = {
  name: "Nathan",
  hand: dealHand(deck),
  wins: 0,
};
let player2 = {
  name: "Alanda",
  hand: dealHand(deck),
  wins: 0,
};

// cl(player1, player2);

if (player1.hand[0].rank > player2.hand[0].rank) {
  cl(`${player1.name} wins`);
} else if (player1.hand[0].rank < player2.hand[0].rank) {
  cl(`${player2.name} wins`);
} else {
  cl("Oops it's a tie");
}
