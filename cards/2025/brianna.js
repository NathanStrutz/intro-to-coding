let cl = console.log;
let ct = console.table;

// ===== Build Deck (you should already have this)=====

function buildDeck() {
  let deck = [];
  const suits = ["Hearts", "Spades", "Diamonds", "Clubs"];
  for (let i = 2; i <= 14; i++) {
    suits.forEach((suit) => {
      deck.push(createCard(i, suit));
    });
  }

  return deck;
}

function createCard(rank, suit) {
  return {
    rank: rank,
    suit: suit,
    color: getColor(suit),
    name: getName(rank),
  };
}

function getName(rank) {
  let name = "";
  if (rank === 11) {
    name = "Jack";
  } else if (rank === 12) {
    name = "Queen";
  } else if (rank === 13) {
    name = "King";
  } else if (rank === 14) {
    name = "Ace";
  } else {
    name = rank;
  }
  return name;
}

function getColor(suit) {
  let color = "";

  if (suit === "Spades" || suit === "Clubs") {
    color = "Black";
  } else if (suit === "Hearts" || suit === "Diamonds") {
    color = "Red";
  }

  return color;
}

let deck = buildDeck();

// ===== Deal Cards (you should already have this too) =====

function dealHand() {
  let hand = [];

  for (let i = 0; i < 26; i++) {
    hand.push(dealCard(deck));
  }

  return hand;
}

function dealCard(deck) {
  let randIndex = Math.floor(Math.random() * deck.length);
  return deck.splice(randIndex, 1)[0];
}

// ===== Create Players (you might have this...) =====

function createPlayer(name) {
  return {
    name: name,
    hand: dealHand(),
    score: 0,
  };
}

let player1 = createPlayer("Brianna"); // Change this name to whatever you want
let player2 = createPlayer("Katie"); // Change this name to whatever you want

//
//
// ========== EVERYTHING PAST THIS IS NEW ==========
//
//

let round = 1;

// ===== Game Logic =====

function playGame() {
  cl("START GAME");

  while (player1.hand.length > 0 && player2.hand.length > 0) {
    playRound();
  }
  endGame();
}

// Round
function playRound() {
  let player1Card = player1.hand.shift();
  let player2Card = player2.hand.shift();

  cl(
    `${player1.name} played a ${player1Card.name} of ${player1Card.suit} and ${player2.name} played a ${player2Card.name} of ${player2Card.suit}`
  );

  compareCards(player1Card, player2Card);
}

// Compare cards
function compareCards(card1, card2) {
  if (card1.rank > card2.rank) {
    roundWinner(player1);
  } else if (card2.rank > card1.rank) {
    roundWinner(player2);
  } else {
    cl(`both cards have the same rank`);
    if (player1.hand.length > 0 && player2.hand.length > 0) {
      playRound();
    }
  }
}
function roundWinner(winner) {
  cl(`${winner.name} won the round`);
  winner.score++;
}

function endGame() {
  if (player1.score > player2.score) {
    cl(`${player1.name} won`);
  } else if (player2.score > player1.score) {
    cl(`${player2.name} won`);
  } else {
    cl("It's a tie!");
  }
}

// ===== Start Game =====
playGame();
