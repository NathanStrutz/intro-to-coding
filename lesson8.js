let getTitle = function (card) {
  return card.symbol + " of " + card.suit;
};

let card1 = {
  suit: "Hearts",
  color: "Red",
  rank: 2,
  symbol: "2",
};

console.table(card1);
console.log(getTitle(card1));

let card2 = {
  suit: "Diamonds",
  color: "Red",
  rank: 11,
  symbol: "Jack",
};

console.table(card2);
console.log(getTitle(card2));
