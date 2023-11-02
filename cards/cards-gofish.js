let cl = console.log;
let ct = console.table;

// Creates an array of all 52 cards
let buildDeck = function () {
  let deck = [];
  for (let i = 2; i <= 14; i++) {
    deck.push(createCard(i, "Hearts"));
    deck.push(createCard(i, "Spades"));
    deck.push(createCard(i, "Diamonds"));
    deck.push(createCard(i, "Clubs"));
  }
  return deck;
};
// Builds a single card based on its rank and suit
let createCard = function (rank, suit) {
  let card = {
    rank: rank,
    suit: suit,
    color: getColor(suit),
    name: getName(rank),
  };
  return card;
};
// Gets the card’s name based on its rank
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
// Gets the card’s color based on its suit
let getColor = function (suit) {
  if (suit === "Clubs" || suit === "Spades") {
    return "black";
  } else {
    return "red";
  }
};

// Provides an array of 5 cards from the deck
let dealHand = function (deck) {
  return [dealCard(deck), dealCard(deck), dealCard(deck), dealCard(deck), dealCard(deck)];
};
// Retrieves single card from the deck
let dealCard = function (deck) {
  if (!deck.length) {
    return false;
  }
  let randomNumber = Math.floor(Math.random() * deck.length);
  let card = deck.splice(randomNumber, 1)[0];
  return card;
};

// ***********
//   Go Fish
// ***********

// This is a 2-player game of go fish, for simplicity

let createPlayer = function (name) {
  return {
    name,
    hand: [],
    matches: [],
    wins: 0,
  };
};

let playGoFish = function (player1, player2) {
  // fresh deck
  let deck = buildDeck();
  // reset players
  player1 = createPlayer(player1.name);
  player2 = createPlayer(player2.name);
  // deal cards
  player1.hand = dealHand(deck);
  player2.hand = dealHand(deck);

  let [player, otherPlayer] = [player1, player2];

  while (player.hand.length > 0) {
    // Go
    let playResult = playerTurn(player, otherPlayer, deck);
    while (playResult === "go again") {
      playResult = playerTurn(player, otherPlayer, deck);
    }
    // swap who's turn it is
    [player, otherPlayer] = [otherPlayer, player];
  }

  // congratulate winner
  cl(`It looks like ${player.name} won. Congratulations ${player.name}!`);
  cl(`${player.name}'s hand (should be empty)`);
  ct(player.hand);
  cl(`${player.name}'s matches (should be paired up)`);
  ct(player.matches);
};
let playerTurn = function (player, otherPlayer, deck) {
  let randomCard = dealCard(player.hand);
  cl(`${player.name}: Do you have any ${randomCard.name}s?`);
  let foundCard = doYouHaveAny(otherPlayer, randomCard);
  if (foundCard) {
    cl(`${otherPlayer.name}: Yes, I have a ${foundCard.name}`);
    // You gave me a match!
    player.matches.push(foundCard);
    player.matches.push(randomCard);
    // Your turn
    return "done";
  } else {
    cl(`${otherPlayer.name}: Nope, go fish`);
    // No matches. Go fish!
    let fishedCard = dealCard(deck);
    if (!fishedCard) {
      cl(`I guess the deck is full`);
      // put this back in my hand
      player.hand.push(randomCard);
      return "done";
    }
    cl(`${player.name}: I picked up a ${fishedCard.name}`);
    if (fishedCard.rank === randomCard.rank) {
      cl(`${player.name}: I got what I wanted!`);
      // I got what I wanted!
      player.matches.push(fishedCard);
      player.matches.push(randomCard);
      // I get to go again!
      return "go again";
    } else {
      // Tuck this card into my hand
      player.hand.push(fishedCard);
      // Your turn
      return "done";
    }
  }
};
let doYouHaveAny = function (otherPlayer, card) {
  let foundIndex = otherPlayer.hand.findIndex((searchCard) => searchCard.rank === card.rank);
  if (foundIndex === -1) {
    return false;
  } else {
    return otherPlayer.hand.splice(foundIndex, 1)[0];
  }
};

let player1 = createPlayer("Nathan");
let player2 = createPlayer("Alanda");
playGoFish(player1, player2);
