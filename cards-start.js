// ************
//   THE DECK
// ************

// Creates an array of all 52 cards
let buildDeck = function () {};
// Builds a single card based on its rank and suit
let createCard = function (rank, suit) {};
// Gets the card’s name based on its rank
let getName = function (rank) {};
// Gets the card’s color based on its suit
let getColor = function (suit) {};

// Provides an array of 5 cards from the deck
let dealHand = function (deck) {};
// Retrieves single card from the deck
let dealCard = function (deck) {};

// ************
//    TESTS
// ************

console.table(createCard(11, "Clubs")); // should be a Jack of Clubs

console.log(getColor("Clubs")); // should be black

console.log(getName(12)); // Should be a Queen

let deck = buildDeck();
console.table(deck);

console.log(deck.length); // 52
console.table(dealCard(deck)); // random card
console.log(deck.length); // 51

console.table(dealHand(deck));
