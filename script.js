const INITIAL_SIZE = 16;
const INVALID_NUMBER_MSG =
  "Not a valid number. Please enter an integer in the range 1 to 100.";

makeGrid();
document.addEventListener("mouseover", handleMouseOver);
document.addEventListener("click", handleClick);

function handleMouseOver(event) {
  if (event.target.className.includes("grid__row__square")) {
    event.target.className += " grid__row__square--filled";
  }
}

function handleClick(event) {
  if (event.target.className.includes("resize-button")) {
    const newSize = getNewSize();
    if (newSize != null) {
      clearGrid();
      makeGrid(newSize);
    }
  }
}

function getNewSize() {
  let newSize;
  let inputInvalid;

  do {
    newSize = prompt("Enter new size:");
    if (newSize == null) return newSize; else newSize = Number(newSize);
    inputInvalid = isNaN(newSize) || !Number.isInteger(newSize) ||
      newSize < 1 || newSize > 100;
    if (inputInvalid) alert(INVALID_NUMBER_MSG);
  } while (inputInvalid);

  return newSize;
}

function makeGrid(size = INITIAL_SIZE) {
  const grid = document.querySelector(".grid");
  
  for (let row = 0; row < size; ++row) {
    const gridRow = document.createElement("div");
    gridRow.className = "grid__row";

    for (let col = 0; col < size; ++col) {
      const square = document.createElement("div");
      square.className = "grid__row__square";
      if (row == 0) square.className += " grid__row__square--top";
      if (col == 0) square.className += " grid__row__square--left";
      gridRow.appendChild(square);
    }

    grid.appendChild(gridRow);
  }
}

function clearGrid() {
  const grid = document.querySelector(".grid");
  while (grid.firstChild) {
    grid.removeChild(grid.lastChild);
  }
}