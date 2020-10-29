let createCard = function (suit, rank) {
  let color;
  if (suit === "Hearts" || suit === "Diamonds") {
    color = "red";
  } else {
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
  for (let index = 2; index <= 14; index++) {
    deck.push(createCard("Hearts", index));
    deck.push(createCard("Spades", index));
    deck.push(createCard("Diamonds", index));
    deck.push(createCard("Clubs", index));
  }
  return deck;
};

// Dealer functions
let deck = createDeck();
let getRandomCard = function () {
  return deck.splice(Math.floor(Math.random() * deck.length), 1)[0];
};
let getHand = function (size = 5) {
  let hand = [];
  for (let count = 0; count < size; count++) {
    hand.push(getRandomCard());
  }
  return hand;
};

// Here come the players
player1 = {
  hand: getHand(),
  numberOfWins: 0,
};
player2 = {
  hand: getHand(),
  numberOfWins: 0,
};

let getHighestCard = function (hand) {
  let highestCard = hand[0];
  for (let index = 0; index < hand.length; index++) {
    const card = hand[index];
    if (card.rank > highestCard.rank) {
      highestCard = card;
    }
  }
  return highestCard;
};

for (let index = 0; index < 100; index++) {
  deck = createDeck();
  player1.hand = getHand(5);
  player2.hand = getHand(5);

  let player1Highest = getHighestCard(player1.hand);
  let player2Highest = getHighestCard(player2.hand);

  if (player1Highest.rank > player2Highest.rank) {
    player1.numberOfWins++;
  } else if (player2Highest.rank > player1Highest.rank) {
    player2.numberOfWins++;
  }
}

console.log("Player 1 wins:", player1.numberOfWins, "times");
console.log("Player 2 wins:", player2.numberOfWins, "times");
