class DisplayHand {
  constructor(hand) {
    this.plainCards = hand;
    this.displayCards = [];

    for (let index = 0; index < hand.length; index++) {
      this.displayCards.push(new DisplayCard(hand[index]));
    }
  }

  draw() {
    for (let index = 0; index < this.displayCards.length; index++) {
      const card = this.displayCards[index];
      card.draw(index * 160 + 20, 20);
    }
  }
}

class DisplayCard {
  constructor(card) {
    this.card = card;
  }

  w = 150;
  h = 200;

  getSymbol() {
    switch (this.card.suit) {
      case "Diamonds":
        return "♦";
      case "Hearts":
        return "♥";
      case "Clubs":
        return "♣";
      case "Spades":
        return "♠";
    }
  }

  draw(x, y) {
    push();
    translate(x, y);

    // paper background
    rect(0, 0, this.w, this.h, 5);

    // center symbol
    textSize(100);
    fill(this.card.color);
    textAlign(CENTER, CENTER);
    text(this.getSymbol(), 15, 0, this.w, this.h);

    // Rank on the top left
    textSize(25);
    textAlign(LEFT, TOP);
    text(this.card.name, 5, 5, this.w, this.h);

    // Rank on the bottom right
    textSize(25);
    textAlign(RIGHT, BOTTOM);
    text(this.card.name, 0, 0, this.w, this.h - 2);

    pop();
  }
}

let dealer = new Dealer();
let hand = new DisplayHand(dealer.getHand());

var setup = function () {
  createCanvas(1000, 800);
};

var draw = function () {
  background("forestgreen");

  hand.draw();
};
