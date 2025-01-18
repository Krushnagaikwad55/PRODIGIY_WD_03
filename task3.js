// script.js
const board = document.getElementById("board");
const cells = document.querySelectorAll("[data-cell]");
const winnerMessage = document.getElementById("winnerMessage");
const winnerText = document.getElementById("winnerText");
const restartButton = document.getElementById("restartButton");

let isXTurn = true;
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function startGame() {
  isXTurn = true;
  winnerMessage.classList.add("hidden");
  cells.forEach(cell => {
    cell.classList.remove("taken");
    cell.textContent = "";
    cell.addEventListener("click", handleClick, { once: true });
  });
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? "X" : "O";
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function placeMark(cell, currentClass) {
  cell.textContent = currentClass;
  cell.classList.add("taken");
}

function swapTurns() {
  isXTurn = !isXTurn;
}

function checkWin(currentClass) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === currentClass;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains("taken");
  });
}

function endGame(draw) {
  if (draw) {
    winnerText.textContent = "It's a Draw!";
  } else {
    winnerText.textContent = `${isXTurn ? "X" : "O"} Wins!`;
  }
  winnerMessage.classList.remove("hidden");
}

restartButton.addEventListener("click", startGame);

startGame();
