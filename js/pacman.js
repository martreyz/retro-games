"use strict";

const startBtn = document.querySelector(".start");

let boardStyles = [];

let pointsToWin = 236;
let bigPointsToWin = 4;
fetch("../data/board.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      boardStyles.push(data[i]);
    }
    completeBoard();
  });
const board = document.querySelector(".board");

//Start:

const startTheGame = () => {
  startBtn.classList.add("congratulations_hidden");
  startPoints = [403, 404, 405, 406, 407, 408];
  renderLifes();
  startPoint();
  ghostPlacement();
  const timerInterval = setInterval(timer, 1000);
};

startBtn.addEventListener("click", startTheGame);

//1- Wall
//2- point
//3- bigPoint
//4- void transitable
//5- void nontransitable

let squares = [];
let score = 0;
let level = 1;
let lifes = 3;

const scoreContainer = document.querySelector(".score");
scoreContainer.innerHTML = score;
const levelContainer = document.querySelector(".level");
levelContainer.innerHTML = level;
const gameOverContainer = document.querySelector(".gameOver");
const finalScore = document.querySelector(".finalScore");
const timerContainer = document.querySelector(".timer");
const finalTime = document.querySelector(".time");
const gameOverText = document.querySelector(".gameOver_text");
const gameOverBtn = document.querySelector(".gameOver_button");

const congratulationsContainer = document.querySelector(".congratulations");
const congratulationsFinalScore = document.querySelector(
  ".congratulationsFinalScore"
);
const congratulationsFinalTime = document.querySelector(".congratulationsTime");
const congratulationsBtn = document.querySelector(".congratulations_button");

//Render and function of timer:
let seconds = 50;
let minutes = 9;

const timer = () => {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (seconds < 10) {
    timerContainer.innerHTML = "0" + minutes + ":0" + seconds;
  } else {
    timerContainer.innerHTML = "0" + minutes + ":" + seconds;
  }
  if (minutes === 10) {
    finalScore.innerHTML = score;
    finalTime.innerHTML = "10:00";
    timerContainer.innerHTML = "10:00";
    gameOverText.innerHTML = "You have run out of time.";
    gameOverContainer.classList.remove("gameOver_hidden");
    clearInterval(gameMoving);
    clearInterval(timerInterval);
  }
};

//Render lifes:

const lifesContainer = document.querySelector(".lifes");

const renderLifes = () => {
  lifesContainer.innerHTML = "";
  for (let i = 0; i < lifes; i++) {
    const life = document.createElement("div");
    life.classList.add("pacman");
    lifesContainer.appendChild(life);
  }
};

const completeBoard = () => {
  for (let i = 0; i < boardStyles.length; i++) {
    const newStyledElement = document.createElement("div");
    board.appendChild(newStyledElement);
    squares.push(newStyledElement);
    if (boardStyles[i] === "Two") {
      const normalPoints = document.createElement("div");
      newStyledElement.classList.add(boardStyles[i]);
      normalPoints.classList.add("normalPoint");
      newStyledElement.id = i;
      newStyledElement.appendChild(normalPoints);
    } else if (boardStyles[i] === "Three") {
      const bigPoints = document.createElement("div");
      newStyledElement.classList.add(boardStyles[i]);
      bigPoints.classList.add("bigPoint");
      newStyledElement.id = i;
      newStyledElement.appendChild(bigPoints);
    } else {
      newStyledElement.classList.add(boardStyles[i]);
      newStyledElement.id = i;
    }
  }
};

//Replay:

const reload = () => {
  location.reload();
};

gameOverBtn.addEventListener("click", reload);
congratulationsBtn.addEventListener("click", reload);

//Pacman movement:

// Starting position of pacman:
let pacmanStart = 490;
const pacman = document.createElement("div");

//Start placement pacman:
const startPoint = () => {
  pacman.classList.add("gamePacman");
  squares[pacmanStart].appendChild(pacman);
};

//Movement and feed pacman:
const pacmanMoving = (ev) => {
  squares[pacmanStart].removeChild(pacman);
  switch (ev.keyCode) {
    case 37:
      if (
        squares[pacmanStart - 1].classList.contains("Two") ||
        squares[pacmanStart - 1].classList.contains("Three") ||
        squares[pacmanStart - 1].classList.contains("Four")
      ) {
        if (
          squares[pacmanStart - 1].classList.contains("Two") &&
          squares[pacmanStart - 1].innerHTML !== ""
        ) {
          if (pacman.classList.contains("speedRun")) {
            score += 4;
            scoreContainer.innerHTML = score;
            pointsToWin--;
          } else {
            score += 2;
            scoreContainer.innerHTML = score;
            pointsToWin--;
          }
        } else if (
          squares[pacmanStart - 1].classList.contains("Three") &&
          squares[pacmanStart - 1].innerHTML !== ""
        ) {
          score += 3;
          pacman.classList.add("speedRun");
          bigPointsToWin--;
          setTimeout(removeClass, 5000);
        }
        if (pacmanStart === 393) {
          squares[419].innerHTML = "";
          pacmanStart = 419;
          pacman.style.transform = "rotate(180deg)";
        } else {
          squares[pacmanStart - 1].innerHTML = "";
          pacmanStart -= 1;
          pacman.style.transform = "rotate(180deg)";
        }
      }
      break;
    case 38:
      if (
        squares[pacmanStart - 28].classList.contains("Two") ||
        squares[pacmanStart - 28].classList.contains("Three") ||
        squares[pacmanStart - 28].classList.contains("Four")
      ) {
        if (
          squares[pacmanStart - 28].classList.contains("Two") &&
          squares[pacmanStart - 28].innerHTML !== ""
        ) {
          if (pacman.classList.contains("speedRun")) {
            score += 4;
            scoreContainer.innerHTML = score;
            pointsToWin--;
          } else {
            score += 2;
            scoreContainer.innerHTML = score;
            pointsToWin--;
          }
        } else if (
          squares[pacmanStart - 28].classList.contains("Three") &&
          squares[pacmanStart - 28].innerHTML !== ""
        ) {
          score += 3;
          pacman.classList.add("speedRun");
          setTimeout(removeClass, 5000);
          bigPointsToWin--;
        }
        squares[pacmanStart - 28].innerHTML = "";
        pacmanStart -= 28;
        pacman.style.transform = "rotate(270deg)";
      }
      break;
    case 39:
      if (
        squares[pacmanStart + 1].classList.contains("Two") ||
        squares[pacmanStart + 1].classList.contains("Three") ||
        squares[pacmanStart + 1].classList.contains("Four")
      ) {
        if (
          squares[pacmanStart + 1].classList.contains("Two") &&
          squares[pacmanStart + 1].innerHTML !== ""
        ) {
          if (pacman.classList.contains("speedRun")) {
            score += 4;
            scoreContainer.innerHTML = score;
            pointsToWin--;
          } else {
            score += 2;
            scoreContainer.innerHTML = score;
            pointsToWin--;
          }
        } else if (
          squares[pacmanStart + 1].classList.contains("Three") &&
          squares[pacmanStart + 1].innerHTML !== ""
        ) {
          score += 3;
          scoreContainer.innerHTML = score;
          bigPointsToWin--;
          pacman.classList.add("speedRun");
          setTimeout(removeClass, 5000);
        }
        if (pacmanStart === 418) {
          squares[393].innerHTML = "";
          pacmanStart = 392;
          pacman.style.transform = "rotate(0deg)";
        } else {
          squares[pacmanStart + 1].innerHTML = "";
          pacmanStart += 1;
          pacman.style.transform = "rotate(0deg)";
        }
      }
      break;
    case 40:
      if (
        squares[pacmanStart + 28].classList.contains("Two") ||
        squares[pacmanStart + 28].classList.contains("Three") ||
        squares[pacmanStart + 28].classList.contains("Four")
      ) {
        if (
          squares[pacmanStart + 28].classList.contains("Two") &&
          squares[pacmanStart + 28].innerHTML !== ""
        ) {
          if (pacman.classList.contains("speedRun")) {
            score += 4;
            scoreContainer.innerHTML = score;
            pointsToWin--;
          } else {
            score += 2;
            scoreContainer.innerHTML = score;
            pointsToWin--;
          }
        } else if (
          squares[pacmanStart + 28].classList.contains("Three") &&
          squares[pacmanStart + 28].innerHTML !== ""
        ) {
          score += 3;
          scoreContainer.innerHTML = score;
          bigPointsToWin--;
          pacman.classList.add("speedRun");
          setTimeout(removeClass, 5000);
        }
        squares[pacmanStart + 28].innerHTML = "";
        pacmanStart += 28;
        pacman.style.transform = "rotate(90deg)";
      }
      break;
  }

  if (pointsToWin === 0 && bigPointsToWin === 0) {
    congratulationsFinalScore.innerHTML = score;
    if (seconds < 10) {
      congratulationsFinalTime.innerHTML = "0" + minutes + ":0" + seconds;
    } else {
      congratulationsFinalTime.innerHTML = "0" + minutes + ":" + seconds;
    }
    congratulationsContainer.classList.remove("congratulations_hidden");
    clearInterval(gameMoving);
    clearInterval(timerInterval);
  }
  squares[pacmanStart].appendChild(pacman);
  checkLevel();
};

const removeClass = () => {
  pacman.classList.remove("speedRun");
};

document.addEventListener("keyup", pacmanMoving);

//Level up:

const checkLevel = () => {
  if (score < 50) {
    level = 1;
    levelContainer.innerHTML = level;
  } else if (score >= 50 && score < 100) {
    level = 2;
    levelContainer.innerHTML = level;
  } else if (score >= 100 && score < 150) {
    level = 3;
    levelContainer.innerHTML = level;
  } else if (score >= 150 && score < 250) {
    level = 4;
    levelContainer.innerHTML = level;
  } else if (score >= 250 && score < 350) {
    level = 5;
    levelContainer.innerHTML = level;
  } else if (score >= 350 && score < 450) {
    level = 6;
    levelContainer.innerHTML = level;
  } else if (score >= 450 && score < 550) {
    level = 7;
    levelContainer.innerHTML = level;
  } else if (score >= 550 && score < 650) {
    level = 8;
    levelContainer.innerHTML = level;
  } else if (score >= 650 && score < 700) {
    level = 9;
    levelContainer.innerHTML = level;
  } else if (score >= 700 && score < 750) {
    level = 10;
    levelContainer.innerHTML = level;
  } else if (score >= 750 && score < 800) {
    level = 11;
    levelContainer.innerHTML = level;
  } else if (score >= 800 && score < 850) {
    level = 12;
    levelContainer.innerHTML = level;
  } else if (score >= 850 && score < 900) {
    level = 13;
    levelContainer.innerHTML = level;
  } else if (score >= 900 && score < 950) {
    level = 14;
    levelContainer.innerHTML = level;
  } else if (score >= 950 && score < 1000) {
    level = 15;
    levelContainer.innerHTML = level;
  } else if (score >= 1000) {
    level = 16;
    levelContainer.innerHTML = level;
  }
};

//Ghosts:

let ghosts = [
  document.createElement("div"),
  document.createElement("div"),
  document.createElement("div"),
  document.createElement("div"),
  document.createElement("div"),
  document.createElement("div"),
];

let startPoints = [403, 404, 405, 406, 407, 408];
let classes = [
  "ghostOne",
  "ghostTwo",
  "ghostThree",
  "ghostFour",
  "ghostFive",
  "ghostSix",
];

//Place ghosts in the board:

const ghostPlacement = () => {
  for (let i = 0; i < ghosts.length; i++) {
    ghosts[i].classList.add(classes[i]);
    squares[startPoints[i]].appendChild(ghosts[i]);
  }
};

let previousDirection = [-28, -28, -28, -28, -28, -28];
let preferredDirection = [1, -1, 28, -28, 1, -1];
//Ghosts movement:
const ghostMovement = () => {
  let directions = [1, -1, 28, -28];
  for (let i = 0; i < ghosts.length; i++) {
    let randomDirection = Math.round(Math.random() * 3);
    if (
      previousDirection[i] !== 28 &&
      !squares[startPoints[i] - 28].classList.contains("One") &&
      squares[startPoints[i]].classList.contains("Five") &&
      startPoints.indexOf(startPoints[i] - 28) === -1
    ) {
      startPoints[i] -= 28;
    } else if (
      previousDirection[i] &&
      !squares[startPoints[i] + previousDirection[i]].classList.contains(
        "One"
      ) &&
      startPoints.indexOf(startPoints[i] + previousDirection[i]) === -1
    ) {
      startPoints[i] += previousDirection[i];
    } else if (
      startPoints.indexOf(startPoints[i] + directions[randomDirection]) !==
        -1 &&
      !squares[startPoints[i] - directions[randomDirection]].classList.contains(
        "One"
      )
    ) {
      startPoints[i] -= directions[randomDirection];
      previousDirection[i] = -directions[randomDirection];
    } else {
      if (randomDirection % 2 === 0) {
        if (previousDirection[i] === 1 || previousDirection[i] === -1) {
          if (
            !squares[startPoints[i] + 28].classList.contains("One") &&
            startPoints.indexOf(startPoints[i] + 28) === -1
          ) {
            startPoints[i] += 28;
            previousDirection[i] = 28;
          } else if (
            !squares[startPoints[i] - 28].classList.contains("One") &&
            startPoints.indexOf(startPoints[i] - 28) === -1
          ) {
            startPoints[i] -= 28;
            previousDirection[i] = -28;
          } else {
            directions = [1, -1];
            randomDirection = Math.round(Math.random() * 1);
            if (
              !squares[
                startPoints[i] + directions[randomDirection]
              ].classList.contains("One") &&
              startPoints.indexOf(
                startPoints[i] + directions[randomDirection]
              ) === -1
            ) {
              startPoints[i] += directions[randomDirection];
              previousDirection[i] = directions[randomDirection];
            }
          }
        } else {
          if (
            !squares[startPoints[i] + 1].classList.contains("One") &&
            startPoints.indexOf(startPoints[i] + 1) === -1
          ) {
            startPoints[i] += 1;
            previousDirection[i] = 1;
          } else if (
            !squares[startPoints[i] - 1].classList.contains("One") &&
            startPoints.indexOf(startPoints[i] - 1) === -1
          ) {
            startPoints[i] -= 1;
            previousDirection[i] = -1;
          } else {
            directions = [28, -28];
            randomDirection = Math.round(Math.random() * 1);
            if (
              !squares[
                startPoints[i] + directions[randomDirection]
              ].classList.contains("One") &&
              startPoints.indexOf(
                startPoints[i] + directions[randomDirection]
              ) === -1
            ) {
              startPoints[i] += directions[randomDirection];
              previousDirection[i] = directions[randomDirection];
            }
          }
        }
      } else {
        if (previousDirection[i] === 1 || previousDirection[i] === -1) {
          if (
            !squares[startPoints[i] - 28].classList.contains("One") &&
            startPoints.indexOf(startPoints[i] - 28) === -1
          ) {
            startPoints[i] -= 28;
            previousDirection[i] = -28;
          } else if (
            !squares[startPoints[i] + 28].classList.contains("One") &&
            startPoints.indexOf(startPoints[i] + 28) === -1
          ) {
            startPoints[i] += 28;
            previousDirection[i] = 28;
          } else {
            directions = [1, -1];
            randomDirection = Math.round(Math.random() * 1);
            if (
              !squares[
                startPoints[i] + directions[randomDirection]
              ].classList.contains("One") &&
              startPoints.indexOf(
                startPoints[i] + directions[randomDirection]
              ) === -1
            ) {
              startPoints[i] += directions[randomDirection];
              previousDirection[i] = directions[randomDirection];
            }
          }
        } else {
          if (
            !squares[startPoints[i] - 1].classList.contains("One") &&
            startPoints.indexOf(startPoints[i] - 1) === -1
          ) {
            startPoints[i] -= 1;
            previousDirection[i] = -1;
          } else if (
            !squares[startPoints[i] + 1].classList.contains("One") &&
            startPoints.indexOf(startPoints[i] + 1) === -1
          ) {
            startPoints[i] += 1;
            previousDirection[i] = 1;
          } else {
            directions = [28, -28];
            randomDirection = Math.round(Math.random() * 1);
            if (
              !squares[
                startPoints[i] + directions[randomDirection]
              ].classList.contains("One") &&
              startPoints.indexOf(
                startPoints[i] + directions[randomDirection]
              ) === -1
            ) {
              startPoints[i] += directions[randomDirection];
              previousDirection[i] = directions[randomDirection];
            }
          }
        }
      }
    }
  }

  if (
    startPoints.indexOf(pacmanStart) !== -1 ||
    startPoints.indexOf(pacmanStart + 1) !== -1 ||
    startPoints.indexOf(pacmanStart - 1) !== -1 ||
    startPoints.indexOf(pacmanStart + 28) !== -1 ||
    startPoints.indexOf(pacmanStart - 28) !== -1
  ) {
    if (pacman.classList.contains("speedRun")) {
      score += 50;
      scoreContainer.innerHTML = score;
    } else {
      pacmanStart = 490;
      lifes--;
      startPoint();
      renderLifes();
    }
    if (lifes === 0) {
      finalScore.innerHTML = score;
      if (seconds < 10) {
        finalTime.innerHTML = "0" + minutes + ":0" + seconds;
      } else {
        finalTime.innerHTML = "0" + minutes + ":" + seconds;
      }
      gameOverContainer.classList.remove("gameOver_hidden");
      clearInterval(gameMoving);
      clearInterval(timerInterval);
    }
  }

  ghostPlacement();
};

let ms = 200 - level * 80;

const gameMoving = setInterval(ghostMovement, ms);
