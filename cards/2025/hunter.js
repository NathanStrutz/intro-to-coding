ct = console.table;

let buildDeck = function () {
  let deck = [];
  for (let i = 2; i <= 14; i++) {
    deck.push(createCard(i, "Spades"));
    deck.push(createCard(i, "Hearts"));
    deck.push(createCard(i, "Clubs"));
    deck.push(createCard(i, "Diamonds"));
  }
  return deck;
};

let createCard = function (rank, suit) {
  return {
    rank: rank,
    suit: suit,
    color: getColor(suit),
    name: getName(rank),
  };
};

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

let getColor = function (suit) {
  if (suit === "Hearts" || suit === "Diamonds") {
    return "red";
  } else {
    return "black";
  }
};

let deck = buildDeck();
ct(deck);

let dealcard = function (deck) {
  let randomNumber = Math.floor(Math.random() * deck.length);
  return deck.splice(randomNumber, 1)[0];
};

let dealhand = function (deck, numCards) {
  let hand = [];
  for (let i = 0; i < numCards; i++) {
    hand.push(dealcard(deck));
  }
  return hand;
};

let dealCardsToPlayers = function (deck) {
  let player1Hand = dealhand(deck, 26);
  let player2Hand = dealhand(deck, 26);
  return { player1Hand, player2Hand };
};

let { player1Hand, player2Hand } = dealCardsToPlayers(deck);
console.log("Player 1 Hand:", player1Hand);
console.log("Player 2 Hand:", player2Hand);

let compareCards = function (card1, card2) {
  if (card1.rank > card2.rank) {
    return 1;
  } else if (card2.rank > card1.rank) {
    return 2;
  } else {
    return 0;
  }
};

while (player1Hand.length > 0 && player2Hand.length > 0) {
  let cardsAtRisk = [];

  while (true) {
    let player1CardStuff = Math.floor(Math.random() * player1Hand.length);
    let player1Card = player1Hand.splice(player1CardStuff, 1)[0];
    let player2CardStuffies = Math.floor(Math.random() * player2Hand.length);
    let player2Card = player2Hand.splice(player2CardStuffies, 1)[0];

    console.log(`Player 1 put down dat ${getName(player1Card.rank)} of ${player1Card.suit}`);
    console.log(`Player 2 put down dat ${getName(player2Card.rank)} of ${player2Card.suit}`);
    cardsAtRisk.push(player1Card, player2Card);
    let winner = compareCards(player1Card, player2Card);
    if (winner === 1) {
      console.log("Player 1 won dis round");
      player1Hand.push(...cardsAtRisk);
      break;
    } else if (winner === 2) {
      console.log("Player 2 won dis round");
      player2Hand.push(...cardsAtRisk);
      break;
    } else {
      console.log("They telepathic so they tied fr 🤷‍♂️ they drawing new cards...");
    }
  }

  if (player1Hand.length === 52) {
    console.log("Atta Boy Player 1 you actually won!");
    break;
  } else if (player2Hand.length === 52) {
    console.log("Atta boy Player 2 you actually won!");
    break;
  }
  console.log(`Player 1 Card Amount: ${player1Hand.length}`);
  console.log(`Player 2 Card Amount: ${player2Hand.length}`);
}
