let cl = console.log;
let ct = console.table;

// Creates an array of all 52 cards
let buildDeck = function () {
  let deck = [];
  for (let i = 2; i < 15; i++) {
    deck.push(createCard(i, "Hearts"));
    deck.push(createCard(i, "Spades"));
    deck.push(createCard(i, "Diamonds"));
    deck.push(createCard(i, "Clubs"));
  }
  return deck;
};
// Builds a single card based on its rank and suit
let createCard = function (rank, suit) {
  return {
    rank,
    suit,
    name: getName(rank),
    color: getColor(suit),
  };
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
  if (suit === "Spades" || suit === "Clubs") {
    return "Black";
  } else {
    return "Red";
  }
};

// Provides an array of 5 cards from the deck
let dealHand = function (deck, size = 5) {
  let hand = [];
  for (let i = 0; i < size; i++) {
    hand.push(dealCard(deck));
  }
  return hand;
};
// Retrieves single card from the deck
let dealCard = function (deck) {
  let r = Math.floor(Math.random() * deck.length);
  return deck.splice(r, 1)[0];
};

let createPlayer = function (name) {
  return {
    name,
    hand: [],
    wins: 0,
  };
};

let gameLoop = function (players) {
  let deck = buildDeck();
  players.forEach((player) => {
    player.hand = dealHand(deck, 2);
    player.points = countPoints(player.hand);
  });

  players.forEach((player) => {
    gameTurn(player, deck);
  });

  let winner = getWinner(players);
  cl("Congratulations to the winner,", winner.name);
  ct(players.map((p) => ({ name: p.name, points: p.points })));
};

let gameTurn = function (player, deck) {
  while (player.points < 16) {
    hitMe(player, deck);
  }
};

let countPoints = function (hand) {
  let total = hand.reduce((total, card) => {
    let cardPoints = 0;
    switch (card.rank) {
      case 11:
        cardPoints = 10;
        break;
      case 12:
        cardPoints = 10;
        break;
      case 13:
        cardPoints = 10;
        break;
      case 14:
        cardPoints = 11;
        break;
      default:
        cardPoints = card.rank;
        break;
    }
    return total + cardPoints;
  }, 0);
  if (total > 21 && hand.find((card) => card.rank === 14)) {
    // Set an Ace as a 1 instead of an 11
    hand.find((card) => card.rank === 14).rank = 1;
    return countPoints(hand);
  } else {
    return total;
  }
};

let hitMe = function (player, deck) {
  player.hand.push(dealCard(deck));
  player.points = countPoints(player.hand);
};

let getWinner = function (players) {
  let bustPlayer = createPlayer("nobody - everyone went BUST!");
  bustPlayer.points = 0;

  return players.reduce((winner, player, i) => {
    // if (i === 0) return player; // the 1st player starts as the "winner" as a placeholder
    if (player.points > winner.points && player.points <= 21) {
      return player;
    } else if (winner.points > player.points || player.points > 21) {
      return winner;
    } else if (winner.points === player.points && player.points <= 21) {
      let tiePlayer = createPlayer(`It's a tie between ${player.name} and ${winner.name}!`);
      tiePlayer.hand = player.hand;
      return tiePlayer;
    } else {
      return bustPlayer;
    }
  }, bustPlayer);
};

gameLoop([createPlayer("Nathan"), createPlayer("Alanda")]);
