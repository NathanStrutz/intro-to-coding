let buildDeck = function () {
  let deck = [];
  for (let i = 2; i < 15; i++) {
    deck.push(createCard("Hearts", i));
    deck.push(createCard("Spades", i));
    deck.push(createCard("Diamonds", i));
    deck.push(createCard("Clubs", i));
  }
  return deck;
};

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

let getSuitColor = function (suit) {
  if (suit === "Spades" || suit === "Clubs") {
    return "black";
  } else {
    return "red";
  }
};

let getRankName = function (rank) {
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
      return rank.toString();
  }

  // if (rank === 11) {
  //   return "Jack";
  // } else if (rank === 12) {
  //   return "Queen";
  // } else if (rank === 13) {
  //   return "King";
  // } else if (rank === 14) {
  //   return "Ace";
  // } else {
  //   return rank.toString();
  // }
};

let dealCard = function () {
  let index = Math.floor(Math.random() * deck.length);
  let card = deck.splice(index, 1)[0];
  return card;
};
let dealHand = function () {
  return [dealCard(), dealCard()];
};

let deck = buildDeck();
console.table(deck);
