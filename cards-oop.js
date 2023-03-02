let cl = console.log;

class Deck {
  deck;
  constructor() {
    this.build();
  }
  // Create all 52 cards
  build() {
    let deck = [];
    for (let i = 2; i <= 14; i++) {
      deck.push(new Card(i, "Hearts"));
      deck.push(new Card(i, "Spades"));
      deck.push(new Card(i, "Diamonds"));
      deck.push(new Card(i, "Clubs"));
    }
    this.deck = deck;
  }

  // Provide an array of n cards from the deck
  dealHand(n = 5) {
    let hand = [];
    for (let i = 0; i < n; i++) {
      hand.push(this.dealCard());
    }
    return hand;
  }

  // Retrieve a single card from the deck
  dealCard() {
    let randomNumber = Math.floor(Math.random() * this.deck.length);
    let card = this.deck.splice(randomNumber, 1)[0];
    return card;
  }
}

class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
    this.color = this.getColor(suit);
    this.name = this.getName(rank);
    this.shortName = this.getShortName(this.getName(rank));
    this.symbol = this.getSymbol(suit);
  }

  // Get the card's name based on its rank
  getName(rank) {
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
  }
  // Get the card's 1-2 character short name
  getShortName(longName) {
    if (longName === "10") {
      return "10";
    } else {
      return longName[0];
    }
  }
  // Get the card's color based on its suit
  getColor(suit) {
    if (suit === "Clubs" || suit === "Spades") {
      return "black";
    } else {
      return "red";
    }
  }
  getSymbol(suit) {
    switch (suit) {
      case "Hearts":
        return "♥";
      case "Spades":
        return "♠";
      case "Diamonds":
        return "♦";
      case "Clubs":
        return "♣";
    }
  }
}

class Hand {
  constructor(deck) {
    this.cards = deck.dealHand();
    this.cards.sort((a, b) => a.rank - b.rank);
  }
  draw() {
    let out = "";
    this.cards.forEach((card) => (out += `┌─────┐ `));
    out += "\n";
    this.cards.forEach((card) => (out += `│${card.symbol}    │ `));
    out += "\n";
    this.cards.forEach((card) => (out += `│  ${card.shortName}${" ".repeat(3 - card.shortName.length)}│ `));
    out += "\n";
    this.cards.forEach((card) => (out += `│    ${card.symbol}│ `));
    out += "\n";
    this.cards.forEach((card) => (out += `└─────┘ `));
    cl(out);
  }
}

let deck = new Deck();
let hand = new Hand(deck);
hand.draw();
