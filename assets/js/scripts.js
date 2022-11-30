const startBtn = document.getElementById("start-quiz");


let game = null;

window.addEventListener("load", () => {
  game = new Game();
});

document.querySelector("#scoreboard").addEventListener("click", () => {
  if (!game.timer) {
    document.querySelector("#intro").classList.remove("active");
    HighScores.viewHighScores();
  }
});

document.querySelector(".highscore-back").addEventListener("click", () => {
  document.querySelector("#leaderboard-section").classList.remove("active");
  document.querySelector("#intro").classList.add("active");
});

document.querySelector(".highscore-clear").addEventListener("click", () => {
  if (confirm("Do you want to remove all your highscores?")) {
    HighScores.clear();
    HighScores.viewHighScores();
  }
});

startBtn.addEventListener("click", () => {
  game.startQuiz(60, true);
});


class Timer {
  constructor(remainingTime = 60, game) {
    if (game) {
      this.remainingTime = remainingTime;
      this.timer = null;
    }
  }

  start() {
    document
      .querySelector(".see-remaining-time")
      .classList.add("js-is-counting");

    if (this.timer === null) {
      clearTimeout(this.timer);
    }

    this.tick();
  }

  modifyTime(change) {
    this.remainingTime += change;
  }

  tick() {
    this.remainingTime -= 1;

    if (this.remainingTime <= 0) {

      game.timerElement.innerHTML = 0;

      clearTimeout(this.timer);
      game.endQuiz();
    } else {
      game.timerElement.innerHTML = this.remainingTime;

      this.timer = setTimeout(() => {
        this.tick();
      }, 1000);
    }
  }

  end() {
    clearTimeout(this.timer);
    this.timer = null;
    document
      .querySelector(".see-remaining-time")
      .classList.remove("js-is-counting");
  }
}

class Game {
  constructor() {
    this.answers = {};
    this.timer = null;
    this.question = 0;
    this.score = 0;
    this.remainingTime = 0;
    this.timerElement = document.querySelector("#time-remaining");
  }

  startQuiz(timer, random) {
    this.question = 0;
    this.generateQuestions(random);
    this.timer = new Timer(timer ? timer : 60, this);

    this.timer.start();
    this.score = 0;

    document.querySelector("#intro").classList.remove("active");
    document.querySelector("#questions-section").classList.add("active");
  }