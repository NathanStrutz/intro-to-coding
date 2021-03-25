class VisualHand {
  constructor() {
    let dealer = new Dealer();
    let hand = dealer.getHand();
    this.hand = [];
    for (let index = 0; index < hand.length; index++) {
      const card = hand[index];
      this.hand.push(new VisualCard(card));
    }
  }

  draw() {
    for (let index = 0; index < this.hand.length; index++) {
      const visualCard = this.hand[index];
      visualCard.draw();
    }
  }

  startMoving() {
    for (let index = this.hand.length - 1; index >= 0; index--) {
      const card = this.hand[index];
      if (mouseX > card.x && mouseX < card.x + 150 && mouseY > card.y && mouseY < card.y + 200) {
        card.startMoving();
        break;
      }
    }
    let sortFn = function (a, b) {
      if (a.isMoving) {
        return 1;
      } else if (b.isMoving) {
        return -1;
      } else {
        return 0;
      }
    };
    this.hand.sort(sortFn);
  }
  stopMoving() {
    for (let index = 0; index < this.hand.length; index++) {
      const card = this.hand[index];
      card.stopMoving();
    }
  }
  move() {
    for (let index = 0; index < this.hand.length; index++) {
      const card = this.hand[index];
      card.move();
    }
  }
}

class VisualCard {
  constructor(card) {
    this.card = card;
  }

  x = 20;
  y = 20;
  isMoving = false;
  xMouseOffset = 0;
  yMouseOffset = 0;

  getSymbol() {
    switch (this.card.suit) {
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

  startMoving() {
    this.isMoving = true;
    this.xMouseOffset = mouseX - this.x;
    this.yMouseOffset = mouseY - this.y;
  }
  stopMoving() {
    this.isMoving = false;
  }

  move() {
    if (this.isMoving) {
      this.x = mouseX - this.xMouseOffset;
      this.y = mouseY - this.yMouseOffset;
    }
  }

  draw() {
    push();
    {
      translate(this.x, this.y);
      fill("white");
      rect(0, 0, 150, 200, 7);

      textAlign(CENTER);
      fill(this.card.color);
      textSize(100);
      text(this.getSymbol(), 75, 130);

      textSize(20);

      textAlign(LEFT);
      text(this.card.name + " " + this.getSymbol(), 10, 24);

      textAlign(RIGHT);
      text(this.getSymbol() + " " + this.card.name, 140, 190);
    }
    pop();
  }
}

let hand = new VisualHand();

var setup = function () {
  createCanvas(1000, 800);
};
var draw = function () {
  background("forestgreen");
  hand.draw();
};

window.mousePressed = function () {
  hand.startMoving.apply(hand);
};
window.mouseReleased = function () {
  hand.stopMoving.apply(hand);
};
window.mouseDragged = function () {
  hand.move.apply(hand);
};
