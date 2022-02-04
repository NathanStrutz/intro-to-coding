class DeckBuilder {
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

  createDeck() {
    let deck = [];
    for (let i = 2; i < 15; i++) {
      deck.push(this.createCard("Hearts", i));
      deck.push(this.createCard("Spades", i));
      deck.push(this.createCard("Diamonds", i));
      deck.push(this.createCard("Clubs", i));
    }
    return deck;
  }
}

class Dealer {
  constructor() {
    this.getNewDeck();
  }
  getNewDeck() {
    this.deck = new DeckBuilder().createDeck();
  }
  getCard() {
    let randomCardIndex = Math.random() * this.deck.length;
    let card = this.deck.splice(randomCardIndex, 1);
    return card[0];
  }
  getHand() {
    let hand = [];
    for (let i = 0; i < 5; i++) {
      hand.push(this.getCard());
    }
    return hand;
  }
}

let dealer = new Dealer();
let hand = dealer.getHand();
console.log(hand);
