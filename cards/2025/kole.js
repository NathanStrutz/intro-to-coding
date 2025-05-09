let cl = console.log;
let ct = console.table;

// Deck of Cards
const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

let buildDeck = function () {
  let deck = [];
  for (let suit of suits) {
    for (let i = 2; i <= 14; i++) {
      let card = {
        rank: i,
        suit: suit,
        color: suit === "Hearts" || suit === "Diamonds" ? "Red" : "Black",
        name: `${i}`,
      };

      if (i === 11) card.name = "Jack";
      if (i === 12) card.name = "Queen";
      if (i === 13) card.name = "King";
      if (i === 14) card.name = "Ace";

      deck.push(card);
    }
  }
  return deck;
};

let getName = function (rank) {
  if (rank === 11) return "Jack";
  if (rank === 12) return "Queen";
  if (rank === 13) return "King";
  if (rank === 14) return "Ace";
  return `${rank}`;
};

let getColor = function (suit) {
  return suit === "Hearts" || suit === "Diamonds" ? "Red" : "Black";
};

let dealCard = function (deck) {
  let randomNumber = Math.floor(Math.random() * deck.length);
  return deck.splice(randomNumber, 1)[0];
};

let dealHand = function (deck) {
  return [dealCard(deck), dealCard(deck), dealCard(deck), dealCard(deck), dealCard(deck), dealCard(deck), dealCard(deck)];
};

let deck = buildDeck();
ct(deck);

// Players
let player1 = { name: "Kole", hand: dealHand(deck), wins: 0 };
let player2 = { name: "Computer", hand: dealHand(deck), wins: 0 };

cl(`${player1.name} has:`, player1.hand);
cl(`${player2.name} has:`, player2.hand);
cl("The deck has", deck.length, "cards");
cl(`----`);

//Gofish Game Logic
let doYouHaveAny = function (hand, rank) {
  return hand.some((card) => card.rank === rank);
};

// Transfer cards
let giveCard = function (playerFrom, playerTo, rank) {
  let cardIndex = playerFrom.hand.findIndex((card) => card.rank === rank);
  let card = playerFrom.hand.splice(cardIndex, 1)[0];
  playerTo.hand.push(card);
};

// Go Fishing function
let goFishing = function (deck, player, wish) {
  if (deck.length > 0) {
    let card = dealCard(deck);
    player.hand.push(card);
    cl(`${player.name} drew a card: The ${card.name} of ${card.suit}`);
    return card.rank === wish;
  } else {
    cl("The deck is empty. No more cards to draw.");
    return false;
  }
};

// Books
let checkForBooks = function (player) {
  let ranks = player.hand.map((card) => card.rank);
  let books = [];
  for (let rank of ranks) {
    let count = player.hand.filter((card) => card.rank === rank).length;
    if (count === 4) {
      books.push(rank);
      player.hand = player.hand.filter((card) => card.rank !== rank);
    }
  }
  return books;
};

// Game loop
let currentPlayer = player1;
let otherPlayer = player2;

while (deck.length > 0 || player1.hand.length > 0 || player2.hand.length > 0) {
  cl(`${currentPlayer.name}'s turn:`);

  if (currentPlayer.hand.length === 0) {
    console.log(`Congratulations ${currentPlayer.name}! You Won!`);
    break;
  }

  let askForCard = currentPlayer.hand[0].rank;
  cl(`${currentPlayer.name} asks: Do you have any ${getName(askForCard)}s?`);

  if (doYouHaveAny(otherPlayer.hand, askForCard)) {
    cl(otherPlayer.name, "says: Yes I do");
    giveCard(otherPlayer, currentPlayer, askForCard);
  } else {
    cl(otherPlayer.name, "says: Go Fish <º)))>< 🐟 ");
    let continueGame = goFishing(deck, currentPlayer, askForCard);

    if (!continueGame) {
      if (currentPlayer === player1) {
        currentPlayer = player2;
        otherPlayer = player1;
      } else {
        currentPlayer = player1;
        otherPlayer = player2;
      }
    }
  }
  checkForBooks(currentPlayer);
  checkForBooks(otherPlayer);
}
cl(`----`);
