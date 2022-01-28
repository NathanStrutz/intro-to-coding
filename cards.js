let createCard = function (suit, rank) {
  let color = getSuitColor(suit);
  let name = getRankName(rank);

  let card = {
    rank,
    suit,
    name,
    color,
  };
  return card;
};

let getRankName = function (rank) {
  if (rank === 11) {
    return "Jack";
  } else if (rank === 12) {
    return "Queen";
  } else if (rank === 13) {
    return "King";
  } else if (rank === 14) {
    return "Ace";
  } else {
    return rank.toString();
  }
};

let getSuitColor = function (suit) {
  if (suit === "Spades" || suit === "Clubs") {
    return "black";
  } else {
    return "red";
  }
};

let createDeck = function () {
  let deck = [];
  for (let i = 2; i < 15; i++) {
    deck.push(createCard("Hearts", i));
    deck.push(createCard("Spades", i));
    deck.push(createCard("Diamonds", i));
    deck.push(createCard("Clubs", i));
  }
  return deck;
};

let deck = createDeck();
console.table(deck);
