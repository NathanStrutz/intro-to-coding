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

/**
 * The main game loop to play Uno
 * @param {Array<player>} players Players playing this game
 */
let gameLoop = function (players) {
  let drawPile = buildDeck();

  players.forEach((player) => {
    player.hand = dealHand(drawPile);
  });
  cl(`Dealt cards to all ${players.length} players.`);

  let discardPile = [dealCard(drawPile)];
  cl(`The discard pile shows a ${discardPile[0].name} of ${discardPile[0].suit}.`);

  // Function to loop through the players
  let nextPlayer = function (currentPlayer) {
    for (let i = 0; i < players.length; i++) {
      if (players[i].name === currentPlayer.name) {
        // found the current player!
        let nextPlayerIndex = i + 1;
        if (nextPlayerIndex >= players.length) {
          nextPlayerIndex = 0;
        }
        cl(`Next player is: ${players[nextPlayerIndex].name}.`);
        return players[nextPlayerIndex];
      }
    }
  };

  // start at the end so player #1 is the actual starter
  let currentPlayer = players[players.length - 1];

  let maxTurns = 1000;

  // play as long as everyone has cards
  while (players.every((p) => p.hand.length > 0)) {
    currentPlayer = nextPlayer(currentPlayer);

    // Shuffle the discard pile back into the draw pile
    if (drawPile.length === 0 && discardPile.length > 0) {
      cl(`Shuffling the discard pile back into the deck`);
      drawPile = discardPile;
      discardPile = drawPile.splice(drawPile.length - 1, 1);
    }

    // Player, take your turn
    gameTurn(currentPlayer, drawPile, discardPile);

    if (--maxTurns <= 0) {
      cl(`That's enough - don't want to infinite loop!`);
      break;
    }
  }

  cl("game over!");
  cl(`${currentPlayer.name} is the winner!`);
};

/**
 *
 * @param {player} player Current player
 * @param {Array<card>} drawPile Cards to draw from if there are no matches from the top card of the discard pile
 * @param {Array<card>} discardPile Check the first card to see if you have a match to also discard
 */
let gameTurn = function (player, drawPile, discardPile) {
  let topCard = discardPile[discardPile.length - 1];
  // first, search for rank matches
  let rankMatch = player.hand.findIndex((card) => card.rank === topCard.rank);
  if (rankMatch >= 0) {
    let foundCard = player.hand.splice(rankMatch, 1)[0];
    discardPile.push(foundCard);
    cl(`${player.name}'s ${foundCard.name} of ${foundCard.suit} matches`);
    return;
  }
  // second, search for suit matches
  let suitMatch = player.hand.findIndex((card) => card.suit === topCard.suit);
  if (suitMatch >= 0) {
    let foundCard = player.hand.splice(suitMatch, 1)[0];
    discardPile.push(foundCard);
    cl(`${player.name}'s ${foundCard.name} of ${foundCard.suit} matches`);
    return;
  }
  // If you are still here, then you don't match anything.
  let newCard = dealCard(drawPile);
  player.hand.push(newCard);
  cl(`${player.name} drew a card`);
};

gameLoop([createPlayer("Nathan"), createPlayer("Alanda"), createPlayer("Samantha"), createPlayer("Jude")]);
