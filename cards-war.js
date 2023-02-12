let cl = console.log;
let ct = console.table;

// Creates an array of all 52 cards
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
// Builds a single card based on its rank and suit
let createCard = function (rank, suit) {
  return {
    rank,
    suit,
    name: getName(rank),
    color: getColor(suit),
  };
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
  if (suit === "Spades" || suit === "Clubs") {
    return "Black";
  } else {
    return "Red";
  }
};

// Provides an array of 5 cards from the deck
let dealHand = function (deck, size = 5) {
  let hand = [];
  for (let i = 0; i < size; i++) {
    hand.push(dealCard(deck));
  }
  return hand;
};
// Retrieves single card from the deck
let dealCard = function (deck) {
  let r = Math.floor(Math.random() * deck.length);
  return deck.splice(r, 1)[0];
};

let createPlayer = function (name) {
  return {
    name,
    hand: [],
    wins: 0,
  };
};

let gameLoop = function (player1, player2, until = 1000) {
  let deck = buildDeck();
  player1.hand = dealHand(deck, 20);
  player2.hand = dealHand(deck, 20);
  let rounds = 0;
  while (player1.hand.length > 0 && player2.hand.length > 0) {
    // Keep playing!
    gameRound(player1, player2);

    if (++rounds > until) {
      return;
    }
  }
};
let gameRound = function (player1, player2) {
  let card1 = getTopCard(player1.hand);
  let card2 = getTopCard(player2.hand);
  if (!card1) return player2;
  if (!card2) return player1;
  if (card1.rank > card2.rank) {
    cl(player1.name, "wins a", card2.name, "of", card2.suit, "with a", card1.name);
    return winRound(player1, card1, card2);
  } else if (card1.rank < card2.rank) {
    cl(player2.name, "wins a", card1.name, "of", card1.suit, "with a", card2.name);
    return winRound(player2, card1, card2);
  } else {
    // It's a tie! Go to WAR!
    cl(`Tie breaker over ${card2.name}s`);
    let warWinner = gameRound(player1, player2);
    cl(warWinner.name, "wins the tie breaker");
    return winRound(warWinner, card1, card2);
  }
};
let getTopCard = function (hand) {
  return hand.splice(0, 1)[0];
};
let winRound = function (player, card1, card2) {
  player.hand.unshift(card1);
  player.hand.unshift(card2);
  player.wins++;
  return player;
};

let player1 = createPlayer("Nathan");
let player2 = createPlayer("Alanda");

let rounds = 10000;
gameLoop(player1, player2, rounds);
cl("Game Over!");
if (player2.hand.length === 0) {
  cl(player1.name, "wins with", player1.wins, "individual victories");
  // ct(player1.hand);
} else if (player1.hand.length === 0) {
  cl(player2.name, "wins with", player2.wins, "individual victories");
  // ct(player2.hand);
} else {
  cl(`The game was called off after a long and boring ${rounds} rounds`);
  cl("Where did we go so wrong?");
  // ct(player1);
  // ct(player1.hand);
  // ct(player2);
  // ct(player2.hand);
}
