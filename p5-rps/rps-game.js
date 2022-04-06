///<reference path="../lib/p5.global-mode.d.ts" />

/*
  3 scenes in Rock Paper Scissors:

  1. Ready to play?
  2. Choose your weapon
    2.a wait for the results
  3. Results
    3.a Congratulate the user for winning
    3.b Console the loser for losing

*/

class RpsGame {
  scenes = {
    start: new StartScene(),
    choose: new ChooseScene(),
    results: new ResultsScene(),
  };
  currentScene = "start";

  readyToPlay() {
    this.currentScene = "choose";
  }
  chooseWeapon() {
    this.currentScene = "results";
  }
  playAgain() {
    this.currentScene = "choose";
  }

  draw() {
    this.scenes[this.currentScene].draw();
  }
}

class Scene {
  draw() {
    fill("red");
    square(50, 25, 200);
    fill(50);
    triangle(150, 50, 50, 200, 250, 200);
  }
}
class StartScene extends Scene {}
class ChooseScene extends Scene {}
class ResultsScene extends Scene {}
