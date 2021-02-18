// https://p5js.org/reference/

function setup() {
  createCanvas(1000, 500);
  background(35, 130, 57); // r g b
}

let dealer = new Dealer();
let hand1 = dealer.getHand(5);
let hand2 = dealer.getHand(5);
let hand3 = dealer.getHand(5);

function draw() {
  let margin = 20;
  let top = 20;
  hand1.forEach((card, index) => {
    new VisualCard(index * 100 + margin + index * margin, top).draw(card);
  });
  top += 150;
  hand2.forEach((card, index) => {
    new VisualCard(index * 100 + margin + index * margin, top).draw(card);
  });
  top += 150;
  hand3.forEach((card, index) => {
    new VisualCard(index * 100 + margin + index * margin, top).draw(card);
  });

  if (mouseIsPressed) {
    fill("#FFFFFF");
    ellipse(mouseX, mouseY, 35, 35);
  }
}

class VisualCard {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.width = 100;
    this.height = (11 * this.width) / 8; // 8x11 card size ratio like a piece of paper
  }

  suitEmoji = {
    Hearts: "♥",
    Spades: "♠",
    Diamonds: "♦",
    Clubs: "♣",
  };

  /**
   * Draw the card
   * @param {Card} card From lesson 10
   */
  draw(card) {
    // outer box
    let cornerRadius = 8;

    fill("white");
    rect(this.x, this.y, this.width, this.height, cornerRadius);
    // inner box
    let inset = 2;
    rect(this.x + inset, this.y + inset, this.width - inset * 2, this.height - inset * 2, cornerRadius - inset);

    // top left card name
    textSize(18);
    fill(card.color);
    textAlign(LEFT);
    text(card.name, this.x + cornerRadius, this.y + textAscent() + cornerRadius / 2);

    // bottom right card name
    textAlign(RIGHT);
    text(card.name, this.x + this.width - inset - 3, this.y + this.height - textDescent() - inset - 2);

    // card suit in the middle
    textAlign(CENTER);
    textSize(70);
    text(this.suitEmoji[card.suit], this.x + this.width - this.width / 2, this.y + this.height - this.height / 2 + 20);
  }
}
