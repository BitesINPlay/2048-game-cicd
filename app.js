const size = 4;
let board = [];
let score = 0;
let gameOver = false;
let won = false;

function createEmptyBoard() {
  return [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
}

function startGame() {
  board = createEmptyBoard();
  score = 0;
  gameOver = false;
  won = false;
  updateScore();
  setMessage("");
  addRandomTile();
  addRandomTile();
  renderBoard();
}

function updateScore() {
  document.getElementById("score").textContent = score;
}

function setMessage(text) {
  document.getElementById("message").textContent = text;
}

function addRandomTile() {
  const emptyCells = [];

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] === 0) {
        emptyCells.push({ row, col });
      }
    }
  }

  if (emptyCells.length === 0) return;

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const { row, col } = emptyCells[randomIndex];
  board[row][col] = Math.random() < 0.9 ? 2 : 4;
}

function renderBoard() {
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = "";

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";

      const value = board[row][col];
      cell.textContent = value === 0 ? "" : value;

      if (value !== 0) {
        cell.classList.add(`tile-${value}`);
      }

      boardElement.appendChild(cell);
    }
  }
}

function slide(row) {
  let filteredRow = row.filter(num => num !== 0);

  for (let i = 0; i < filteredRow.length - 1; i++) {
    if (filteredRow[i] === filteredRow[i + 1]) {
      filteredRow[i] = filteredRow[i] * 2;
      score += filteredRow[i];

      if (filteredRow[i] === 2048 && !won) {
        won = true;
        setMessage("Браво! Достигна 2048!");
      }

      filteredRow[i + 1] = 0;
    }
  }

  filteredRow = filteredRow.filter(num => num !== 0);

  while (filteredRow.length < size) {
    filteredRow.push(0);
  }

  return filteredRow;
}

function moveLeft() {
  let moved = false;

  for (let row = 0; row < size; row++) {
    const original = [...board[row]];
    const newRow = slide(board[row]);
    board[row] = newRow;

    if (original.join(",") !== newRow.join(",")) {
      moved = true;
    }
  }

  if (moved) {
    addRandomTile();
    updateScore();
    renderBoard();
    checkGameOver();
  }
}

function reverseRows() {
  for (let row = 0; row < size; row++) {
    board[row].reverse();
  }
}

function transposeBoard() {
  const newBoard = createEmptyBoard();

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      newBoard[row][col] = board[col][row];
    }
  }

  board = newBoard;
}

function moveRight() {
  reverseRows();
  moveLeft();
  reverseRows();
  renderBoard();
}

function moveUp() {
  transposeBoard();
  moveLeft();
  transposeBoard();
  renderBoard();
}

function moveDown() {
  transposeBoard();
  moveRight();
  transposeBoard();
  renderBoard();
}

function hasEmptyCell() {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] === 0) {
        return true;
      }
    }
  }
  return false;
}

function canMove() {
  if (hasEmptyCell()) return true;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size - 1; col++) {
      if (board[row][col] === board[row][col + 1]) {
        return true;
      }
    }
  }

  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size - 1; row++) {
      if (board[row][col] === board[row + 1][col]) {
        return true;
      }
    }
  }

  return false;
}

function checkGameOver() {
  if (!canMove()) {
    gameOver = true;
    setMessage("Край на играта!");
  }
}

document.addEventListener("keydown", function(event) {
  if (gameOver) return;

  if (event.key === "ArrowLeft") {
    moveLeft();
  } else if (event.key === "ArrowRight") {
    moveRight();
  } else if (event.key === "ArrowUp") {
    moveUp();
  } else if (event.key === "ArrowDown") {
    moveDown();
  }
});

startGame();