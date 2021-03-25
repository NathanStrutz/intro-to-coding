class VisualCard {
  constructor(card) {
    this.card = card;
  }

  x = 20;
  y = 20;

  draw() {
    fill("white");
    rect(this.x, this.y, 150, 200, 7);

    // ♥ ♦ ♠ ♣
    fill(this.card.color);
    textSize(100);
    text("♣", 100, 100);
  }
}

let dealer = new Dealer();
let card = dealer.getCard();
let visualCard = new VisualCard(card);

var setup = function () {
  createCanvas(1000, 800);
};
var draw = function () {
  background("forestgreen");
  visualCard.draw();
};
