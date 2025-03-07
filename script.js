makeGrid();
document.addEventListener("mouseover", handleMouseOver);

function handleMouseOver(event) {
  if (event.target.className.includes("grid__row__square")) {
    event.target.className += " grid__row__square--filled";
  }
}

function makeGrid() {
  for (let row = 0; row < 16; ++row) {
    const gridRow = document.createElement("div");
    gridRow.className = "grid__row";

    for (let col = 0; col < 16; ++col) {
      const square = document.createElement("div");
      square.className = "grid__row__square";
      if (row == 0) square.className += " grid__row__square--top";
      if (col == 0) square.className += " grid__row__square--left";
      gridRow.appendChild(square);
    }

    const grid = document.querySelector(".grid");
    grid.appendChild(gridRow);
  }
}