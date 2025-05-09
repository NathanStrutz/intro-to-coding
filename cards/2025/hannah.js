let cl = console.log;
let ct = console.table;

// deck

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

  if (suit === "Hearts" || suit === "Diamonds") {
    color = "Red";
  } else if (suit === "Spades" || suit === "Clubss") {
    color = "Black";
  }

  return color;
}

let deck = buildDeck();

// deal     hahahahahahehhahhwhwhhwhehhahhwhhehwhhahwhhhwhshwhwh

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

// the players(SHEEP teacher edition)hehe

function createPlayer(name) {
  return {
    name: name,
    hand: dealHand(),
  };
}

let player1 = createPlayer("Daniel");
let player2 = createPlayer("Katie");

let round = 1;

// may the games begin (may the odds be ever in your favor) Who's hungry?

function playGame() {
  cl("START GAME");

  playRound();
}

// Round 1  *fight*
function playRound() {
  let player1Card = player1.hand.shift();
  let player2Card = player2.hand.shift();

  cl(
    `${player1.name} played a ${player1Card.name} of ${player1Card.suit} and ${player2.name} played a ${player2Card.name} of ${player2Card.suit}`
  );

  compareCards(player1Card, player2Card);
}

// whos the victor
function compareCards(card1, card2) {
  if (card1.rank > card2.rank) {
    cl(`${card1.name} of ${card1.suit} is higher than ${card2.rank} of ${card2.suit}. Therefore, Daniel won!`);
  } else if (card1.rank < card2.rank) {
    cl(`${card2.name} of ${card2.suit} is higher than ${card1.rank} of ${card1.suit}. Therefore, Katie won!`);
  }
}
playGame();

cl(dealCard(deck));
