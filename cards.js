let buildDeck = function () {
  let deck = [];
  for (let rank = 2; rank < 15; rank++) {
    deck.push(createCard("Hearts", rank));
    deck.push(createCard("Spades", rank));
    deck.push(createCard("Diamonds", rank));
    deck.push(createCard("Clubs", rank));
  }
  return deck;
};

let createCard = function (suit, rank) {
  let color = getSuitColor(suit);
  let name = getRankName(rank);

  let card = {
    rank: rank,
    suit: suit,
    name: name,
    color: color,
  };
  return card;
};

let getSuitColor = function (suit) {
  if (suit === "Clubs" || suit === "Spades") {
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
};

let dealCard = function () {
  let index = Math.floor(Math.random() * deck.length);
  let card = deck.splice(index, 1)[0];
  return card;
};
let dealHand = function () {
  return [dealCard(), dealCard(), dealCard(), dealCard(), dealCard()];
};

let createPlayer = function (name) {
  let cards = dealHand();
  let score = calculateScore(cards);
  return {
    name: name,
    hand: cards,
    score: score,
    wins: 0,
  };
};
let calculateScore = function (hand) {
  // if () {}
};
let pokerUtils = {
  sortByRank: function (hand) {
    return hand.sort(function (a, b) {
      return a.rank - b.rank;
    });
  },
  sortBySuit: function (hand) {
    return hand.sort(function (a, b) {
      return a.suit - b.suit;
    });
  },
  countSuits(hand) {
    return new Set(hand.map((c) => c.suit)).size;
  },
  /**
   * Analyzes the hand and returns any matches by rank
   * @returns {{rank: count}} An object of ranks on hand with their duplicated counts
   */
  collectMatchedSets: function (hand) {
    let sets = {};
    for (let c = 0; c < hand.length; c++) {
      const card = hand[c];
      if (sets[card.rank]) {
        sets[card.rank]++;
      } else {
        sets[card.rank] = 1;
      }
    }
    return sets;
  },
  countDuplicates: function (hand) {
    let sets = this.collectMatchedSets(hand);
    let duplicates = {
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };
    for (let setRank in sets) {
      duplicates[sets[setRank]]++;
    }
    return duplicates;
  },
  analyzeHand(hand) {
    return {
      rankSets: this.collectMatchedSets(hand),
      numberOfSuits: this.countSuits(hand),
      matches: this.countDuplicates(hand),
    };
  },
};
let pokerRules = {
  hasStraightFlush: function (hand) {
    return this.hasFlush(hand) && this.hasStraight(hand);
  },
  hasFourOfAKind: function (hand) {
    !!pokerUtils.countDuplicates(hand)["4"];
  },
  hasFullHouse: function (hand) {
    pokerUtils.countDuplicates(hand)["3"] &&
      pokerUtils.countDuplicates(hand)["2"];
  },
  hasFlush: function (hand) {
    return pokerUtils.analyzeHand(hand).numberOfSuits === 1;
  },
  hasStraight: function (hand) {
    pokerUtils.sortByRank(hand);
    return (
      hand[0].rank === hand[1].rank - 1 &&
      hand[1].rank === hand[2].rank - 1 &&
      hand[2].rank === hand[3].rank - 1 &&
      hand[3].rank === hand[4].rank - 1
    );
  },
  hasThreeOfAKind: function (hand) {
    !!pokerUtils.countDuplicates(hand)["3"];
  },
  hasTwoPair: function (hand) {
    pokerUtils.countDuplicates(hand)["2"] === 2;
  },
  hasOnePair: function (hand) {
    !!pokerUtils.countDuplicates(hand)["2"];
  },
  highestCard: function (hand) {
    return hand.reduce((a, b) => (a.rank > b.rank ? a : b));
  },
};
let handResult = function (hand) {
  if (pokerRules.hasStraightFlush(hand)) {
    return "Straight Flush";
  } else if (pokerRules.hasFourOfAKind(hand)) {
    return "Four of a Kind";
  } else if (pokerRules.hasFullHouse(hand)) {
    return "Full House";
  } else if (pokerRules.hasFlush(hand)) {
    return "Flush";
  } else if (pokerRules.hasStraight(hand)) {
    return "Straight";
  } else if (pokerRules.hasThreeOfAKind(hand)) {
    return "Three of a Kind";
  } else if (pokerRules.hasTwoPair(hand)) {
    return "Two Pair";
  } else if (pokerRules.hasOnePair(hand)) {
    return "One Pair";
  } else {
    return "High Card: " + pokerRules.highestCard(hand).name;
  }
};

let deck = buildDeck();

let players = [
  createPlayer("Nathan"),
  createPlayer("Alanda"),
  createPlayer("Samantha"),
];

for (let i = 0; i < players.length; i++) {
  const player = players[i];
  console.log(player.name);
  console.log(handResult(player.hand));
}
