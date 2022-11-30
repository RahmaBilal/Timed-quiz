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
