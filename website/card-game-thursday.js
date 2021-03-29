class VisualCard {
  constructor(card) {
    this.card = card;
  }

  x = 20;
  y = 20;

  getIcon() {
    if (this.card.suit === "Diamonds") {
      return "♦";
    } else if (this.card.suit === "Hearts") {
      return "♥";
    } else if (this.card.suit === "Clubs") {
      return "♣";
    } else if (this.card.suit === "Spades") {
      return "♠";
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

    textSize(20);
    textAlign(LEFT);
    text(this.card.name, 10, 10);

    textAlign(RIGHT);
    text(this.card.name, 150, 180);
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
