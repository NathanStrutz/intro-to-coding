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
    this.color = this.getColor();
    this.name = this.getName();
    this.shortName = this.getShortName();
    this.symbol = this.getSymbol();
  }

  // Get the card's name based on its rank
  getName() {
    switch (this.rank) {
      case 11:
        return "Jack";
      case 12:
        return "Queen";
      case 13:
        return "King";
      case 14:
        return "Ace";
      default:
        return this.rank + "";
    }
  }
  // Get the card's 1-2 character short name
  getShortName() {
    if (this.name === "10") {
      return "10";
    } else {
      return this.name[0];
    }
  }
  // Get the card's color based on its suit
  getColor() {
    if (this.suit === "Clubs" || this.suit === "Spades") {
      return "black";
    } else {
      return "red";
    }
  }
  getSymbol() {
    switch (this.suit) {
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
  draw() {
    let ill = this.getIllustrator();
    let out = "";
    out += ill.at(1);
    out += "\n";
    out += ill.at(2);
    out += "\n";
    out += ill.at(3);
    out += "\n";
    out += ill.at(4);
    out += "\n";
    out += ill.at(5);
    out += "\n";
  }
  getIllustrator() {
    return new CardIllustrator(this);
  }
}
class CardIllustrator {
  constructor(card) {
    this.card = card;
  }
  at(h) {
    switch (h) {
      case 1:
        return `┌─────┐ `;
      case 2:
        return `│${this.card.symbol}    │ `;
      case 3:
        return `│  ${this.card.shortName}${" ".repeat(3 - this.card.shortName.length)}│ `;
      case 4:
        return `│    ${this.card.symbol}│ `;
      case 5:
        return `└─────┘ `;
    }
  }
}

class CardCollection {
  constructor(cards) {
    this.cards = cards;
  }
  draw() {
    let illustrators = this.cards.map((c) => c.getIllustrator());
    let outRows = [1, 2, 3, 4, 5].reduce(
      (out, i) => (out += illustrators.reduce((line, ill) => (line += ill.at(i)), "") + "\n"),
      ""
    );
    console.log(outRows);
  }
}

class Hand extends CardCollection {
  constructor(deck) {
    let c = deck.dealHand();
    super(c);
    this.cards = c;
    this.cards.sort((a, b) => a.rank - b.rank);
  }
}

let deck = new Deck();
let hand = new Hand(deck);
hand.draw();

console.log("  🡫");
let miscCards = new CardCollection([hand.cards[0], deck.dealCard()]);
miscCards.draw();
