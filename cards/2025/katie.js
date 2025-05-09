let cl = console.log;
let ct = console.table;

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

function dealHand() {
  let hand = [];

  for (let i = 0; i < 7; i++) {
    hand.push(dealCard(deck));
  }
  hand.sort((a, b) => b.rank - a.rank);

  return hand;
}

function dealCard(deck) {
  let randIndex = Math.floor(Math.random() * deck.length);
  return deck.splice(randIndex, 1)[0];
}

function createPlayer(name) {
  return {
    name: name,
    hand: dealHand(),
  };
}

let player1 = createPlayer("KATIE");
let player2 = createPlayer("BRIANNA");

function playGame() {
  cl("START GAME");

  while (player1.hand.length > 0 && player2.hand.length > 0) {
    playRound();
  }
}

function playRound() {
  let player1Card = player1.hand.shift();
  let player2Card = player2.hand.shift();

  cl(
    `${player1.name} played a ${player1Card.name} of ${player1Card.suit} and ${player2.name} played a ${player2Card.name} of ${player2Card.suit}`
  );

  compareCards(player1Card.rank, player2Card.rank);
}

function compareCards(card1, card2) {
  if (card1 > card2) {
    cl(`${player1.name} wins`);
    player1.wins++;
  } else if (card2 < card1) {
    cl(`${player2.name} wins`);
    player2.wins++;
  } else {
    cl(`It's a tie!`);
  }
}

function createPlayer(KATIE) {
  return {
    name: KATIE,
    hand: dealHand(),
    wins: 0,
  };
}

function gameResults() {
  cl(`${player1.name} has ${player1.wins} points and ${player2.name} has ${player2.wins} points`);
  if (player1.wins > player2.wins) {
    cl(`${player1.name} won!`);
  } else if (player2.wins > player1.wins) {
    cl(`${player2.name} won!`);
  } else {
    cl("It's a tie!");
  }
}

function Endgame() {}
playGame();
