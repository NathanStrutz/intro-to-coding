// Creates an array of all 52 cards
let buildDeck = function () {
  let deck = [];
  for (let i = 2; i <= 14; i++) {
    deck.push(createCard(i, "Hearts"));
    deck.push(createCard(i, "Spades"));
    deck.push(createCard(i, "Diamonds"));
    deck.push(createCard(i, "Clubs"));
  }
  return deck;
};
// Builds a single card based on its rank and suit
let createCard = function (rank, suit) {
  let card = {
    rank: rank,
    suit: suit,
    color: getColor(suit),
    name: getName(rank),
  };
  return card;
};
// Gets the card’s name based on its rank
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
      return rank + "";
  }
};
// Gets the card’s color based on its suit
let getColor = function (suit) {
  if (suit === "Clubs" || suit === "Spades") {
    return "black";
  } else {
    return "red";
  }
};

// Provides an array of 5 cards from the deck
let dealHand = function (deck) {
  return [dealCard(deck), dealCard(deck), dealCard(deck), dealCard(deck), dealCard(deck)];
};
// Retrieves single card from the deck
let dealCard = function (deck) {
  let randomNumber = Math.floor(Math.random() * deck.length);
  let card = deck.splice(randomNumber, 1)[0];
  return card;
};

// **********
//   TESTS
// **********

console.table(createCard(11, "Clubs")); // should be a Jack of Clubs

console.log(getColor("Clubs")); // should be black

console.log(getName(12)); // Should be a Queen

let deck = buildDeck();
console.table(deck);

console.log(deck.length); // 52
console.table(dealCard(deck)); // random card
console.log(deck.length); // 51

console.table(dealHand(deck));
