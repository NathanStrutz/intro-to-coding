function buildDeck() {
  let suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  let ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  let deck = [];

  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      let card = createCard(ranks[j], suits[i]);
      deck.push(card);
    }
  }
  return deck;
}

function createCard(rank, suit) {
  return {
    rank: rank,
    suit: suit,
    name: getName(rank) + " of " + suit,
    color: getColor(suit),
    value: rank > 10 ? 10 : rank === 14 ? 11 : rank,
  };
}

function getName(rank) {
  let names = { 11: "Jack", 12: "Queen", 13: "King", 14: "Ace" };
  return names[rank] || rank;
}

function getColor(suit) {
  return suit === "Hearts" || suit === "Diamonds" ? "red" : "black";
}

function dealCard(deck) {
  return deck.pop();
}

function dealHand(deck) {
  return [dealCard(deck), dealCard(deck)];
}

function calculateHandValue(hand) {
  let value = 0;
  let aceCount = 0;

  for (let i = 0; i < hand.length; i++) {
    value += hand[i].value;
    if (hand[i].rank === 14) {
      aceCount++;
    }
  }

  while (value > 21 && aceCount > 0) {
    value -= 10;
    aceCount--;
  }
  return value;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  return deck;
}

function determineWinner(players) {
  let winner = players[0];

  for (let i = 1; i < players.length; i++) {
    if (players[i].score > winner.score && players[i].score <= 21) {
      winner = players[i];
    }
  }
  return winner;
}

let gameName = "Blackjack";
console.log("Game chosen: " + gameName);

let player1 = { name: "bartholomew", hand: [], score: 0 };
let player2 = { name: "ice spice", hand: [], score: 0 };
let dealer = { name: "Dealer", hand: [], score: 0 };
let players = [player1, player2, dealer];
let deck = buildDeck();
deck = shuffleDeck(deck);
players.forEach((player) => {
  player.hand = dealHand(deck);
  player.score = calculateHandValue(player.hand);
});

players.forEach((player) => {
  console.table(player.hand);
  console.log(`${player.name} Score: ${player.score}`);
});
let winner = determineWinner(players);
console.log(`The winner is: ${winner.name}`);
console.log(`The winner's score is: ${winner.score}`);
