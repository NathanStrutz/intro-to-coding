//Suit and color
const suits = [
  { suit: "Hearts", color: "Red" },
  { suit: "Diamonds", color: "Red" },
  { suit: "Clubs", color: "Black" },
  { suit: "Spades", color: "Black" },
];

//Generate a deck of cards
function generateDeck() {
  const deck = [];
  suits.forEach(({ suit, color }) => {
    for (let i = 2; i <= 14; i++) {
      let card = {
        rank: i,
        suit: suit,
        color: color,
        name: `${i} of ${suit}`,
      };

      if (i === 11) card.name = `Jack of ${suit}`;
      if (i === 12) card.name = `Queen of ${suit}`;
      if (i === 13) card.name = `King of ${suit}`;
      if (i === 14) card.name = `Ace of ${suit}`;

      deck.push(card);
    }
  });
  return deck;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

//Deal 5-card hands
function dealThreeHands(deck) {
  return [deck.splice(0, 5), deck.splice(0, 5), deck.splice(0, 5)];
}

//Deal two community cards
function dealCommunityCards(deck) {
  return deck.splice(0, 2);
}

//Show hands and community cards
function displayHands(hands) {
  hands.forEach((hand, index) => {
    console.log(`Hand ${index + 1}:`);
    hand.forEach((card) => console.log(card.name));
    console.log("------------------");
  });
}
function displayCommunityCards(communityCards) {
  console.log("Community Cards:");
  communityCards.forEach((card) => console.log(card.name));
  console.log("------------------");
}

//Hand ranking values
const handRankings = {
  "Royal Flush": 10,
  "Straight Flush": 9,
  "Four of a Kind": 8,
  "Full House": 7,
  Flush: 6,
  Straight: 5,
  "Three of a Kind": 4,
  "Two Pair": 3,
  "One Pair": 2,
  "High Card": 1,
};

//Rank of hands
function rankHand(hand, communityCards) {
  const allCards = hand.concat(communityCards);
  const ranks = allCards.map((card) => card.rank).sort((a, b) => b - a);
  const suits = allCards.map((card) => card.suit);

  const isFlush = suits.every((suit) => suit === suits[0]);
  const isStraight = ranks.every((value, index, arr) => {
    return index === 0 || value === arr[index - 1] - 1;
  });

  // Count occurrences of each rank
  const rankCount = {};
  ranks.forEach((rank) => {
    rankCount[rank] = (rankCount[rank] || 0) + 1;
  });

  // Sort by most common rank, then by highest value
  const sortedRanks = Object.entries(rankCount)
    .map(([rank, count]) => ({ rank: parseInt(rank), count }))
    .sort((a, b) => b.count - a.count || b.rank - a.rank);

  const fourOfKind = sortedRanks.find((r) => r.count === 4);
  const threeOfKind = sortedRanks.find((r) => r.count === 3);
  const pairs = sortedRanks.filter((r) => r.count === 2);

  if (isFlush && isStraight && ranks.includes(14)) return { rank: "Royal Flush", values: ranks };
  if (isFlush && isStraight) return { rank: "Straight Flush", values: ranks };
  if (fourOfKind) return { rank: "Four of a Kind", values: [fourOfKind.rank, ...ranks] };
  if (threeOfKind && pairs.length)
    return {
      rank: "Full House",
      values: [threeOfKind.rank, pairs[0].rank],
    };
  if (isFlush) return { rank: "Flush", values: ranks };
  if (isStraight) return { rank: "Straight", values: ranks };
  if (threeOfKind) return { rank: "Three of a Kind", values: [threeOfKind.rank, ...ranks] };
  if (pairs.length === 2)
    return {
      rank: "Two Pair",
      values: [pairs[0].rank, pairs[1].rank, ...ranks.filter((r) => r !== pairs[0].rank && r !== pairs[1].rank)],
    };
  if (pairs.length === 1)
    return {
      rank: "One Pair",
      values: [pairs[0].rank, ...ranks.filter((r) => r !== pairs[0].rank)],
    };

  return { rank: `High Card`, values: ranks };
}

// Compare hands properly
function compareHands(hand1, hand2) {
  const rank1 = handRankings[hand1.rank];
  const rank2 = handRankings[hand2.rank];

  if (rank1 !== rank2) return rank1 > rank2 ? 1 : -1;

  for (let i = 0; i < hand1.values.length; i++) {
    if (hand1.values[i] > hand2.values[i]) return 1;
    if (hand1.values[i] < hand2.values[i]) return -1;
  }
  return 0;
}

// Whos the winner
function determineWinner(hands, communityCards) {
  const handRanks = hands.map((hand) => rankHand(hand, communityCards));

  handRanks.forEach((handRank, index) => {
    console.log(`Hand ${index + 1} is ranked: ${handRank.rank}`);
  });

  const highestRankValue = Math.max(...handRanks.map((h) => handRankings[h.rank]));
  const bestHands = handRanks
    .map((h, index) => (handRankings[h.rank] === highestRankValue ? index : null))
    .filter((index) => index !== null);

  if (bestHands.length === 1) {
    console.log(`The winner is Hand ${bestHands[0] + 1}!`);
  } else {
    let winner = bestHands[0];
    for (let i = 1; i < bestHands.length; i++) {
      const comparison = compareHands(handRanks[winner], handRanks[bestHands[i]]);
      if (comparison < 0) winner = bestHands[i];
    }

    if (bestHands.every((index) => compareHands(handRanks[winner], handRanks[index]) === 0)) {
      console.log(`It's a draw between hands: ${bestHands.map((i) => i + 1).join(" and ")}`);
    } else {
      console.log(`The winner is Hand ${winner + 1}!`);
    }
  }
}

//players
const players = [
  { name: "Jacob", chips: 100, currentBet: 0, isActive: true },
  { name: "Nathan", chips: 100, currentBet: 0, isActive: true },
  { name: "Dan", chips: 100, currentBet: 0, isActive: true },
];

let pot = 0;
let currentBet = 0;

//betting
function placeBet(player, amount) {
  if (amount > player.chips) {
    console.log(`${player.name} doesn't have enough chips!`);
    return false;
  }

  player.chips -= amount;
  player.currentBet += amount;
  pot += amount;
  console.log(`${player.name} bets ${amount} chips.`);
  return true;
}

function call(player) {
  let amountToCall = currentBet - player.currentBet;
  if (amountToCall > player.chips) amountToCall = player.chips; // All-in condition
  placeBet(player, amountToCall);
  console.log(`${player.name} calls with ${amountToCall} chips.`);
}

function raise(player, amount) {
  if (placeBet(player, amount)) {
    currentBet = player.currentBet;
    console.log(`${player.name} raises to ${currentBet} chips.`);
  }
}

function fold(player) {
  player.isActive = false;
  console.log(`${player.name} folds.`);
}

function check(player) {
  if (player.currentBet < currentBet) {
    console.log(`${player.name} cannot check, they must call or fold.`);
  } else {
    console.log(`${player.name} checks.`);
  }
}

//more betting
function bettingRound() {
  for (let player of players) {
    if (!player.isActive) continue; // Skip folded players

    console.log(`\n${player.name}'s turn:`);
    console.log(`Current pot: ${pot}, Current bet: ${currentBet}`);
    console.log(`${player.name} has ${player.chips} chips.`);

    // Simulate a decision (for now, random choice)
    let decision = ["call", "raise", "fold", "check"][Math.floor(Math.random() * 4)];

    if (decision === "call") call(player);
    else if (decision === "raise") raise(player, 10);
    else if (decision === "fold") fold(player);
    else if (decision === "check") check(player);
  }
}

//Game setup
function setupGame() {
  const deck = generateDeck();
  shuffleDeck(deck);

  const hands = dealThreeHands(deck);

  const communityCards = dealCommunityCards(deck);

  displayHands(hands);
  console.log("\n--- Betting Round 1 ---");
  bettingRound();
  displayCommunityCards(communityCards);

  console.log("\n--- Betting Round 2 ---");
  bettingRound();

  determineWinner(hands, communityCards);
  console.log("Remaining cards in deck:", deck.length);
}

setupGame();
