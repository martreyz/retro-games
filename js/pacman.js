"use strict";

let boardStyles = [];
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

//1- Wall
//2- point
//3- bigPoint
//4- void transitable
//5- void nontransitable

let squares = [];
let score = 0;

const scoreContainer = document.querySelector(".score");
scoreContainer.innerHTML = score;

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
  startPoint();
};

//Pacman movement:

// Starting position of pacman:
let pacmanStart = 490;
const pacman = document.createElement("div");

const startPoint = () => {
  pacman.classList.add("gamePacman");
  squares[pacmanStart].appendChild(pacman);
};

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
          } else {
            score += 2;
            scoreContainer.innerHTML = score;
          }
        } else if (
          squares[pacmanStart - 1].classList.contains("Three") &&
          squares[pacmanStart - 1].innerHTML !== ""
        ) {
          score += 3;
          pacman.classList.add("speedRun");
          setTimeout(removeClass, 10000);
        }
        if (pacmanStart === 393) {
          squares[419].innerHTML = "";
          pacmanStart = 419;
        } else {
          squares[pacmanStart - 1].innerHTML = "";
          pacmanStart -= 1;
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
          } else {
            score += 2;
            scoreContainer.innerHTML = score;
          }
        } else if (
          squares[pacmanStart - 28].classList.contains("Three") &&
          squares[pacmanStart - 28].innerHTML !== ""
        ) {
          score += 3;
          pacman.classList.add("speedRun");
          setTimeout(removeClass, 10000);
        }
        squares[pacmanStart - 28].innerHTML = "";
        pacmanStart -= 28;
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
          } else {
            score += 2;
            scoreContainer.innerHTML = score;
          }
        } else if (
          squares[pacmanStart + 1].classList.contains("Three") &&
          squares[pacmanStart + 1].innerHTML !== ""
        ) {
          score += 3;
          pacman.classList.add("speedRun");
          setTimeout(removeClass, 10000);
        }
        if (pacmanStart === 418) {
          squares[393].innerHTML = "";
          pacmanStart = 392;
        } else {
          squares[pacmanStart + 1].innerHTML = "";
          pacmanStart += 1;
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
          } else {
            score += 2;
            scoreContainer.innerHTML = score;
          }
        } else if (
          squares[pacmanStart + 28].classList.contains("Three") &&
          squares[pacmanStart + 28].innerHTML !== ""
        ) {
          score += 3;
          pacman.classList.add("speedRun");
          setTimeout(removeClass, 10000);
        }
        squares[pacmanStart + 28].innerHTML = "";
        pacmanStart += 28;
      }
      break;
  }
  squares[pacmanStart].appendChild(pacman);
};

const removeClass = () => {
  pacman.classList.remove("speedRun");
};

document.addEventListener("keyup", pacmanMoving);
