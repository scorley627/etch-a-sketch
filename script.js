const INITIAL_SIZE = 16;
const INVALID_NUMBER_MSG =
  "Not a valid number. Please enter an integer in the range 1 to 100.";

makeGrid();
document.addEventListener("mouseover", handleMouseOver);
document.addEventListener("click", handleClick);

function handleMouseOver(event) {
  const isSquare = event.target.className.includes("grid__row__square");
  const isFilledSquare = isSquare && event.target.className.includes("filled");
  const isOpaqueSquare = isFilledSquare &&
    !event.target.style.backgroundColor.includes("a");
  if (isSquare && !isFilledSquare) {
    event.target.style.backgroundColor = getRandomColor();
    event.target.className += " grid__row__square--filled";
  } else if (isFilledSquare && !isOpaqueSquare) {
    increaseOpacity(event.target);
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

function increaseOpacity(square) {
  const squareColor = square.style.backgroundColor;
  const rgba = squareColor.split(",");
  const red = parseFloat(rgba[0].substring(5));
  const green = parseFloat(rgba[1]);
  const blue = parseFloat(rgba[2]);
  const opacity = parseFloat(rgba[3]);
  square.style.backgroundColor =
    `rgba(${red}, ${green}, ${blue}, ${opacity + 0.1})`;
}

function getRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgba(${red}, ${green}, ${blue}, 0.1)`;
}