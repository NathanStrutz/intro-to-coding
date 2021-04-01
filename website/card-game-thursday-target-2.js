class VisualCard {
  constructor(card) {
    this.card = card;
  }

  x = 20;
  y = 20;

  getIcon() {
    return {
      Hearts: "♥",
      Diamonds: "♦",
      Spades: "♠",
      Clubs: "♣",
    }[this.card.suit];
  }
  getCornerName() {
    switch (this.card.name) {
      case "Ace":
        return "A";
      case "King":
        return "K";
      case "Queen":
        return "Q";
      case "Jack":
        return "J";
      default:
        return this.card.name;
    }
  }

  draw() {
    translate(this.x, this.y);

    fill("white");
    rect(0, 0, 150, 200, 7);

    fill(this.card.color);
    textSize(100);
    textAlign(CENTER);
    text(this.getIcon(), 75, 130);

    // The corners
    textSize(20);
    textLeading(20);
    textAlign(CENTER);

    // Top left corner
    text(this.getCornerName() + "\n" + this.getIcon(), 16, 24);

    // Rotation for the bottom-right corner
    // spin it around and have it mirror the top-left corner
    push();
    {
      translate(150, 200);
      rotate(PI * 3);
      text(this.getCornerName() + "\n" + this.getIcon(), 16, 24);
    }
    pop();
  }
}

// Get a card dealer:
let dealer = new Dealer();

let visCard1 = new VisualCard(dealer.getCard());

let visCard2 = new VisualCard(dealer.getCard());
visCard2.x = 200;

var setup = function () {
  createCanvas(1000, 800);
};
var draw = function () {
  background("forestgreen");
  visCard1.draw();
  visCard2.draw();
};
