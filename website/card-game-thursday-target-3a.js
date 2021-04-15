class VisualCard {
  constructor(card) {
    this.card = card;
  }

  x = 20;
  y = 20;
  isDragging = false;
  xOffset = 0;
  yOffset = 0;

  dragging() {
    if (mouseX > this.x && mouseX < this.x + 150 && mouseY > this.y && mouseY < this.y + 200) {
      this.isDragging = true;
      this.xOffset = mouseX - this.x;
      this.yOffset = mouseY - this.y;
      return true;
    } else {
      return false;
    }
  }

  drag() {
    if (this.isDragging) {
      this.x = mouseX - this.xOffset;
      this.y = mouseY - this.yOffset;
    }
  }

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
    this.drag();
    push();
    {
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
    pop();
  }
}

// Get a card dealer:
let dealer = new Dealer();

let hand = dealer.getHand();
let visualHand = hand.map((c) => new VisualCard(c));
visualHand.forEach((vc, i) => (vc.x = i * 170 + 20));

var setup = function () {
  createCanvas(1000, 800);
};
var draw = function () {
  background("forestgreen");
  visualHand.forEach((vc) => vc.draw());
};

window.mousePressed = function () {
  // loop from the top down to always select the top card
  for (let index = visualHand.length - 1; index >= 0; index--) {
    const vc = visualHand[index];
    if (vc.dragging()) {
      break;
    }
  }
  // re-sort the array so the card we are dragging is on top (last)
  visualHand = visualHand.sort(function (a, b) {
    if (a.isDragging) {
      return 1;
    } else if (b.isDragging) {
      return -1;
    } else {
      return 0;
    }
  });
};
window.mouseReleased = function () {
  for (let index = 0; index < visualHand.length; index++) {
    const vc = visualHand[index];
    vc.isDragging = false;
  }
};
