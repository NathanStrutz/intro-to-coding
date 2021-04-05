class VisualCard {
  /**
   *
   * @param {Card} card
   */
  constructor(card) {
    this.card = card;
  }

  x = 20;
  y = 20;
  isDragging = false;

  getIcon() {
    if (this.card.suit === "Hearts") {
      return "♥";
    } else if (this.card.suit === "Diamonds") {
      return "♦";
    } else if (this.card.suit === "Spades") {
      return "♠";
    } else if (this.card.suit === "Clubs") {
      return "♣";
    }
  }

  drag() {
    if (this.isDragging) {
      this.x = mouseX;
      this.y = mouseY;
    }
  }

  draw() {
    this.drag();
    push();
    {
      translate(this.x, this.y);

      fill("white");
      rect(0, 0, 150, 200, 7);

      fill(this.card.color);
      textSize(100);
      textAlign(CENTER);
      text(this.getIcon(), 75, 125);

      textSize(20);
      textAlign(LEFT);
      text(this.card.name, 15, 30);

      textSize(20);
      textAlign(RIGHT);
      text(this.card.name, 135, 170);
    }
    pop();
  }
}

let dealer = new Dealer();
let hand = dealer.getHand();
let visualHand = hand.map((card) => new VisualCard(card));

// let visualHand = [];
// for (let index = 0; index < hand.length; index++) {
//   const card = hand[index];
//   visualHand.push(new VisualCard(card));
// }

var setup = function () {
  createCanvas(1000, 800);
};
var draw = function () {
  background("forestgreen");
  for (let index = 0; index < visualHand.length; index++) {
    const visualCard = visualHand[index];
    visualCard.draw();
  }
};

var mousePressed = function () {
  visualHand[4].isDragging = true;
};
var mouseReleased = function () {
  visualHand[4].isDragging = false;
};
