let createCard = function (suit, rank) {
  let color = "red";
  if (suit === "Spades" || suit === "Clubs") {
    color = "black";
  }

  let name = rank;
  if (rank === 11) {
    name = "Jack";
  } else if (rank === 12) {
    name = "Queen";
  } else if (rank === 13) {
    name = "King";
  } else if (rank === 14) {
    name = "Ace";
  }

  let card = {
    rank: rank,
    suit: suit,
    color: color,
    name: name,
  };
  return card;
};

let createDeck = function () {
  let deck = [];

  for (let rank = 2; rank <= 14; rank++) {
    deck.push(createCard("Hearts", rank));
    deck.push(createCard("Diamonds", rank));
    deck.push(createCard("Clubs", rank));
    deck.push(createCard("Spades", rank));
  }

  return deck;
};

let deck = createDeck();

// Players & Hands
let player1 = [];
let player2 = [];

let getRandomCard = function () {
  let randomCardNumber = Math.floor(Math.random() * deck.length);
  let removedCardArray = deck.splice(randomCardNumber, 1);
  let card = removedCardArray[0];
  return card;
};

let getRandomCard2 = function () {
  return deck.splice(Math.floor(Math.random() * deck.length), 1)[0];
};

let getHand = function () {
  return [
    getRandomCard2(),
    getRandomCard2(),
    getRandomCard2(),
    getRandomCard2(),
    getRandomCard2(),
  ];
};

player1 = getHand();
player2 = getHand();

let getPlayerScore = function (hand) {
  let cardsInOrder = hand.sort((a, b) => b.rank - a.rank);

  let firstSuit = cardsInOrder[0].suit;
  let isFlush = true;
  for (let index = 0; index < cardsInOrder.length; index++) {
    const card = cardsInOrder[index];
    if (card.suit !== firstSuit) {
      isFlush = false;
    }
  }
  if (isFlush) {
    console.log("It's a flush!");
    return 100;
  } else {
    return cardsInOrder[0].rank;
  }
};

console.table(player1);
console.table(player2);
console.log(getPlayerScore(player1), " vs ", getPlayerScore(player2));

if (getPlayerScore(player1) > getPlayerScore(player2)) {
  console.log("Player 1 wins!");
} else if (getPlayerScore(player2) > getPlayerScore(player1)) {
  console.log("Player 2 wins!");
} else {
  console.log("Oh no, it was a tie!");
}
