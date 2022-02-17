class Deck {
  cards;

  constructor() {
    this.cards = this.buildDeck();
  }

  createCard(suit, rank) {
    let color = this.getSuitColor(suit);
    let name = this.getRankName(rank);

    let card = {
      rank,
      suit,
      name,
      color,
    };
    return card;
  }

  getRankName(rank) {
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
  }

  getSuitColor(suit) {
    if (suit === "Spades" || suit === "Clubs") {
      return "black";
    } else {
      return "red";
    }
  }

  buildDeck() {
    let deck = [];
    for (let i = 2; i < 15; i++) {
      deck.push(this.createCard("Hearts", i));
      deck.push(this.createCard("Spades", i));
      deck.push(this.createCard("Diamonds", i));
      deck.push(this.createCard("Clubs", i));
    }
    return deck;
  }

  getCard() {
    let randomCardIndex = Math.random() * this.cards.length;
    let card = this.cards.splice(randomCardIndex, 1);
    return card[0];
  }
}

class Dealer {
  constructor() {
    this.getNewDeck();
  }
  getNewDeck() {
    this.deck = new Deck();
  }
  getCard() {
    return this.deck.getCard();
  }
  getHand(size = 5) {
    let hand = [];
    for (let i = 0; i < size; i++) {
      hand.push(this.getCard());
    }
    return hand;
  }
}

class Player {
  name;
  hand;
  wins = 0;

  constructor(name) {
    this.name = name;
  }
}

class Game {
  dealer = new Dealer();
  players = [
    new Player("Nathan"),
    new Player("Alanda"),
    new Player("Samantha"),
  ];

  constructor() {
    this.deal();
  }

  deal() {
    this.players.forEach((p) => (p.hand = dealer.getHand()));
  }
}
