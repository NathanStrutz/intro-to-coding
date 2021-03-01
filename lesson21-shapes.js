let box;

var setup = function () {
  createCanvas(canvas.width, canvas.height);
  box = new MovingRect();
};

var draw = function () {
  background(200);
  box.render();
};
