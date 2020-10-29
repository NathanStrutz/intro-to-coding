class PackOfCards {
  createCard(suit, rank) {
    let color;
    if (suit === "Hearts" || suit === "Diamonds") {
      color = "red";
    } else {
      color = "black";
    }

    let name = rank;
    if (rank === 11) {
      name = "Jack";
    } else if (rank === 12) {
      name = "Queen";
    } else if (rank === 13) {
      name = "King";
    } else if (rank === 14) {
      name = "Ace";
    }

    let card = {
      rank: rank,
      suit: suit,
      color: color,
      name: name,
    };
    return card;
  }
  createDeck() {
    let deck = [];
    for (let index = 2; index <= 14; index++) {
      deck.push(this.createCard("Hearts", index));
      deck.push(this.createCard("Spades", index));
      deck.push(this.createCard("Diamonds", index));
      deck.push(this.createCard("Clubs", index));
    }
    return deck;
  }
}

class Dealer {
  setNewDeck(pack) {
    this.deck = pack.createDeck();
  }

  getCard() {
    return this.deck.splice(Math.floor(Math.random() * this.deck.length), 1)[0];
  }
  getHand(size = 5) {
    let hand = [];
    for (let count = 0; count < size; count++) {
      hand.push(this.getCard());
    }
    return hand;
  }
}

class Player {
  constructor() {
    this.numberOfWins = 0;
  }

  setNewHand(hand) {
    this.hand = hand;
  }

  getHighestCard() {
    let highestCard = this.hand[0];
    for (let index = 0; index < this.hand.length; index++) {
      const card = this.hand[index];
      if (card.rank > highestCard.rank) {
        highestCard = card;
      }
    }
    return highestCard;
  }

  getScore() {
    return this.getHighestCard().rank;
  }

  youWin() {
    this.numberOfWins++;
  }
  getWins() {
    return this.numberOfWins;
  }
}

let dealer = new Dealer();

let player1 = new Player();
let player2 = new Player();

for (let index = 0; index < 100; index++) {
  dealer.setNewDeck(new PackOfCards());
  player1.setNewHand(dealer.getHand(5));
  player2.setNewHand(dealer.getHand(5));

  if (player1.getScore() > player2.getScore()) {
    player1.youWin();
  } else if (player2.getScore() > player1.getScore()) {
    player2.youWin();
  }
}

console.log("Player 1 wins:", player1.getWins(), "times");
console.log("Player 2 wins:", player2.getWins(), "times");
