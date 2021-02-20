var setup = function () {
  createCanvas(700, 950);
  noLoop();

  // rotate in degrees, so it works for normal math & my brain
  angleMode(DEGREES);
};

var draw = function () {
  // set up how this grid will work
  let across = 12;
  let down = 20;
  let squareSize = 500 / across;

  // an easter egg for later
  let special = { across: floor(random(across)), down: floor(random(down)) };

  // offset the starting point so we can draw outside the lines
  translate(100, 60);
  strokeWeight(2);
  for (let vertical = 0; vertical < down; vertical++) {
    for (let horizontal = 0; horizontal < across; horizontal++) {
      // push and pop put our settings in a scope - so the next
      // translate & rotate won't affect the one after it
      push();

      // most of the boxes are transparent squares
      noFill();

      // The easter egg - one random colored square
      if (horizontal === special.across && vertical === special.down) {
        // random red/green/blue color
        fill(random(255), random(255), random(255));
      }

      // Rotate each box placement, more and more as we go down
      // I used a sine to get it to change more gradually.
      rotate(random(-vertical * 0.2 + sin(vertical * 320), vertical * 0.2 + sin(vertical)));

      // Another translate to move the focus to the local area, so {1,1} is the top corner of this local area.
      // This time I'm doing it so that the rotation above affects the distance the box is from its home.
      // That way, it has more travel distance from it's regular spot, the further down the page it goes.
      translate(squareSize * horizontal, squareSize * vertical);

      // Rotate each box spin so they aren't straight
      // Again, I used a sine to make the change gradual, more and more as we loop down
      rotate(random(-vertical * log(vertical), +vertical * log(vertical)));

      square(-squareSize / 2, -squareSize / 2, squareSize);
      // end the push/pop to leave the translation settings behind, localized to that last box
      pop();
    }
  }
};
