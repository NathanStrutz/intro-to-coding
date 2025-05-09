let buildDeck = function () {
  let deck = [];
  for (let i = 2; i <= 14; i++) {
    let name = i;
    if (i === 11) {
      name = "Jack";
    } else if (i === 12) {
      name = "Oueen";
    } else if (i === 13) {
      name = "King";
    } else if (i === 14) {
      name = "Ace";
    }

    let card = {
      rank: i,
      suit: "Hearts",
      color: "red",
      name: name,
    };
    console.log(`${card.name} of ${card.suit} is ranked ${card.rank}`);
    deck.push(card);
  }
  return deck;
};
let createCard = function (rank, suit) {};
let getName = function (rank) {};
let getColor = function (suit) {};

let dealHand = function (deck) {};
let dealCard = function (deck) {
  console.log(deck);
  return deck.splice(Math.floor(Math.random() * deck.length), 1)[0];
};

let deck = buildDeck();

// dealDeck = function (players, shuffledDeck) {
//   let dealingCards1 = shuffledDeck.splice(0, 26);
//   for (let i = 0; i < dealingCards1.lenght; i++) {
//     player[0].hands.push(dealingCards1[i]);
//   }
// };

let player1 = { name: "Jackson", card: dealCard(deck) };
let player2 = { name: "Cameron", card: dealCard(deck) };

if (player1.card.rank > player2.card.rank) {
  console.log("congrats to" + player1.name + "you won!");
}

//     let player1 = {name: "Jackson", card: dealCard(deck)};
// let player2 = {name: "Cameron", card: dealCard(deck)};

if (player1.card.rank > player2.card.rank) {
  console.log("Congrats to " + player1.name + ", you won!");
} else if (player1.card.rank < player2.card.rank) {
  console.log("Congrats to " + player2.name + ", you won!");
} else {
}

function playGame() {
  let deck = createDeck();
  deck = shuffleDeck(deck);
  let [player1Deck, player2Deck] = dealCards(deck);

  while (player1Deck.length > 0 && player2Deck.length > 0) {
    playRound(player1Deck, player2Deck);
  }

  declareWinner(player1Deck, player2Deck);
}
