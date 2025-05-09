let builddeck = function () {
  let deck = [];
  for (let i = 2; i <= 14; i++) {
    deck.push(createcard(i, "spades"));
    deck.push(createcard(i, "clubs"));
    deck.push(createcard(i, "hearts"));
    deck.push(createcard(i, "diamonds"));
  }
  return deck;
};
let createcard = function (rank, suit) {
  return {
    rank: rank,
    suit: suit,
    color: getcolor(suit),
    name: "",
  };
};
let getname = function (rank) {
  switch (rank) {
    case 11:
      return "jack";
    case 12:
      return "queen";
    case 13:
      return "king";
    case 14:
      return "ace";
    default:
      return rank + "";
  }
};
let getcolor = function (suit) {
  if (suit === "hearts" || suit === "diamonds") {
    return "red";
  } else {
    return "black";
  }
};
let dealcard = function (deck) {
  let index = Math.floor(Math.random() * deck.length);
  let card = deck.splice(index, 1)[0];
  return card;
};
let dealhand = function (deck) {
  return [
    dealcard(deck),
    dealcard(deck),
    dealcard(deck),
    dealcard(deck),
    dealcard(deck),
    dealcard(deck),
    dealcard(deck),
    dealcard(deck),
    dealcard(deck),
    dealcard(deck),
    dealcard(deck),
    dealcard(deck),
    dealcard(deck),
    dealcard(deck),
    dealcard(deck),
    dealcard(deck),
    dealcard(deck),
    dealcard(deck),
    dealcard(deck),
    dealcard(deck),
    dealcard(deck),
    dealcard(deck),
    dealcard(deck),
    dealcard(deck),
    dealcard(deck),
    dealcard(deck),
  ];
};
let createplayer = function (name) {
  return {
    name: name,
    hand: [],
    wins: 0,
  };
};
let compareCard = function (card1, card2) {
  if (card1.suit === card2.suit) {
    return card1.value > card2.value;
  } else {
    const suitOrder = ["diamonds", "hearts", "spades", "clubs"];
    return suitOrder.indexOf(card1.suit) > suitOrder.indexOf(card2.suit);
  }
};

let play = function () {
  const [pDeck1, pDeck2] = this.deal();
  while (pDeck1.length >= 10 && pDeck2.length >= 10) {
    const card1 = pDeck1.pop();
    const card2 = pDeck2.pop();
    if (this.compareCard(card1, card2)) {
      pDeck1.unshift(card1, card2);
    } else {
      pDeck2.unshift(card1, card2);
    }
  }
  if (pDeck1.length > pDeck2.length) {
    console.log("Player 1 wins!");
  } else if (pDeck2.length > pDeck1.length) {
    console.log("Player 2 wins!");
  } else {
    console.log("It's a tie!");
  }
};

// class MyProgram {
// static main() {
// const war = new War();
// war.play();
// }
// }
//
// MyProgram.main();

let deck = builddeck();
console.table(deck);

let player1 = {
  name: "player1",
  hand: dealhand(deck),
  wins: 0,
};
let player2 = {
  name: "player2",
  hand: dealhand(deck),
  wins: 0,
};

play();
