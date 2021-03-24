class VisualCard {
  constructor(card) {
    this.card = card;
    this.x = 20;
    this.y = 20;
  }

  getSymbol() {
    switch (card.suit) {
      case "Hearts":
        return "♥";
      case "Diamonds":
        return "♦";
      case "Spades":
        return "♠";
      case "Clubs":
        return "♣";
    }
  }

  move() {
    console.log("Moooooooove", `x: ${this.x}=${window.mouseX}`);
    this.x = window.mouseX;
    this.y = window.mouseY;
  }

  draw() {
    translate(this.x, this.y);
    fill("white");
    rect(0, 0, 150, 200, 7);

    fill(card.color);
    textSize(100);
    text(this.getSymbol(), 50, 50);
  }
}

// Get a card dealer:
let dealer = new Dealer();
// Get some cards:
let card = dealer.getCard();
let visCard = new VisualCard(card);

var setup = function () {
  createCanvas(1000, 800);
};
var draw = function () {
  background("forestgreen");
  visCard.draw();
};
