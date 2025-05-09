// Deck
let buildDeck = function (rank, suit) {
  let deck = [];
  for (let i = 2; i <= 14; i++) {
    deck.push(createCard(i, "Spades"));
    deck.push(createCard(i, "Hearts"));
    deck.push(createCard(i, "Clubs"));
    deck.push(createCard(i, "Diamonds"));
  }
  return deck;
};
// Card
let createCard = function (rank, suit) {
  return {
    rank: rank,
    suit: suit,
    color: getColor(suit),
    name: getName(rank),
  };
};
// Rank
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
//Color
let getColor = function (suit) {
  if (suit === "Hearts" || suit === "Diamonds") {
    return "red";
  } else {
    return "black";
  }
};
// Deal Card
let dealCard = function (deck) {
  let index = Math.floor(Math.random() * deck.length);
  let card = deck.splice(index, 1)[0];
  return card;
};

// Deal Hand
let dealHand = function (deck) {
  return [dealCard(deck), dealCard(deck), dealCard(deck), dealCard(deck), dealCard(deck)];
};

let deck = buildDeck();
console.table(deck);

//Players

let createPlayer = function (name) {
  return {
    name: name,
    hand: [],
    wins: 0,
  };
};
console.log(createPlayer("Red", "5", "1"));
console.log(createPlayer("Yellow", "5", "0"));
console.log(createPlayer("Blue", "5", "0"));
console.log(createPlayer("Green", "5", "0"));

let player1 = createPlayer("Red");
player1.hand = dealHand(deck);

console.log(player1);
console.log(deck.length);

let player2 = createPlayer("Yellow");
player2.hand = dealHand(deck);

console.log(player2);
console.log(deck.length);

let player3 = createPlayer("Blue");
player3.hand = dealHand(deck);

console.log(player3);
console.log(deck.length);

let player4 = createPlayer("Green");
player4.hand = dealHand(deck);

console.log(player4);
console.log(deck.length);

// Asking for cards

let doYouHaveAny = function (asking, asked, rank, deck) {
  let cards = asked.hand.filter((card) => card.rank === rank);
  if (cards.length > 0) {
    asking.hand.push(cards);
    asked.hand = asked.hand.filter((card) => card.rank === rank);
    return true;
  } else {
    asking.hand.push(dealCard(deck));
    return false;
  }
};
console.log(doYouHaveAny(player1, player2, 10, deck));

// Collecting books

let Book = function (player, rank) {
  let count = 0;
  for (let card of player.hand) {
    if (card.rank === rank) {
      count++;
    }
  }
  return count === 4;
};
console.log(Book(player1, 14));

// Discard Pile for Books

let BookDiscardPile = function (player) {
  let BookDiscardPile = [];
  for (let i = 2; i <= 14; i++) BookDiscardPile.push(createBook, i("Two"));
  BookDiscardPile.push(createBook, i("Three"));
  BookDiscardPile.push(createBook, i("Four"));
  BookDiscardPile.push(createBook, i("Five"));
  BookDiscardPile.push(createBook, i("Six"));
  BookDiscardPile.push(createBook, i("Seven"));
  BookDiscardPile.push(createBook, i("Eight"));
  BookDiscardPile.push(createBook, i("Nine"));
  BookDiscardPile.push(createBook, i("Ten"));
  BookDiscardPile.push(createBook, i("Jack"));
  BookDiscardPile.push(createBook, i("Queen"));
  BookDiscardPile.push(createBook, i("King"));
  BookDiscardPile.push(createBook, i("Ace"));

  return BookDiscardPile;
};
console.log(BookDiscardPile(player1));

let GameOver = function (player) {
  let count = 0;
  for (let card of player.hand)
    if (player.hand.length === 0) {
      GameOver;
      break;
    }

  if (player.hand === 0) {
    GameOver;
  }
};
console.log(GameOver(player1));

// GoFish

let GoFish = function (asking, asked, deck) {
  if (asking || asked === false) {
    dealCard(deck);
  }
};
console.log(GoFish);

// Winning the Game

let playerHasWon = function (player) {
  let books = 0;
  for (let rank = 2; rank <= 14; rank++) {
    if (Book(player, rank)) {
      books++;
    }
  }

  return books === 13;
};
console.log(playerHasWon(player1));

// All Players

let allPlayers = [player1, player2, player3, player4];
let currentPlayerIndex = 0;
while (true) {
  let currentPlayer = allPlayers[currentPlayerIndex];
  let playerBeingAsked = allPlayers[(currentPlayerIndex + 1) % allPlayers.length];
  let randomCard = currentPlayer.hand[Math.floor(Math.random() * currentPlayer.hand.length)];

  if (doYouHaveAny(currentPlayer, playerBeingAsked, randomCard.rank, deck)) {
    Book(currentPlayer, randomCard.rank);
  } else {
    GoFish;
  }

  if (playerHasWon(currentPlayer)) {
    console.log(`Congratulations ${currentPlayer.name}! You Won!`);
    break;
  } else {
    console.log(`Better luck next time ${currentPlayer.name}!`);
  }

  currentPlayerIndex = (currentPlayerIndex + 1) % allPlayers.length;
}

console.log(allPlayers);
console.log(allPlayers);

let giveCard = function (playerFrom, playerTo, wish) {
  let cardIndex = playerFrom.hand.findIndex((card) => card.rank === wish);
  let card = playerFrom.hand.splice(cardIndex, 1)[0];
  playerTo.hand.push(card);
};

let goFishing = function (deck, player, wish) {
  let card = dealCard(deck);
  player.hand.push(card);
  return card.rank === wish;
};
