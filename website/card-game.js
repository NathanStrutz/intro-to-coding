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
    return this.card.name == this.card.rank ? this.card.name : this.card.name[0];
  }

  draw() {
    this.drag();
    push();
    {
      // move the x/y to this card's location
      translate(this.x, this.y);

      // The card background
      fill("white");
      strokeWeight(2);
      rect(0, 0, 150, 200, 7);

      // The suit icon in the middle
      textAlign(CENTER);
      fill(this.card.color);

      // But first, something special.
      // A rotated number of translucent icons around the main one, based on the rank
      if (this.card.name === "Ace") {
        // but not for aces
        textSize(150);
        text(this.getIcon(), 75, 140);
      } else {
        push();
        {
          fill(red(this.card.color), green(this.card.color), blue(this.card.color), 20);
          textSize(50);
          translate(75, 100); // center of card
          for (let index = 0; index < this.card.rank; index++) {
            text(this.getIcon(), 0, -40);
            rotate(360 / this.card.rank);
          }
        }
        pop();

        // and the main icon
        textSize(100);
        text(this.getIcon(), 75, 130);
      }

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
        rotate(180);
        text(this.getCornerName() + "\n" + this.getIcon(), 16, 24);
      }
      pop();
    }
    pop();
  }
}

// Get a card dealer
let dealer = new Dealer();
// and a hand of cards (just the data)
let hand = dealer.getHand();
// turn that hand of cards into a hand of visual cards
let visualHand = hand.map((c) => new VisualCard(c));
// space them out a bit
visualHand.forEach((vc, i) => (vc.x = i * 170 + 20));

var setup = function () {
  createCanvas(1000, 800);
};
var draw = function () {
  background("forestgreen");
  angleMode(DEGREES);

  // draw all the cards
  visualHand.forEach((vc) => vc.draw());
};

window.mousePressed = function () {
  // mouse is down, let's try dragging everything
  visualHand.forEach((vc) => vc.dragging());
};
window.mouseReleased = function () {
  // mouse is up, stop dragging everything
  visualHand.forEach((vc) => (vc.isDragging = false));
};
