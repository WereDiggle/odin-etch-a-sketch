const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

const gameboyColors = ["#9bbc0f", "#8bac0f", "#306230", "#0f380f"];
var curColor = gameboyColors[3];

var mouseDown = 0;
document.body.onmouseup = () => {
  mouseDown = 0;
};

function fillBoard(nRows, nCols) {
  // Clear old cells
  $$("#drawboard>button").forEach((cell) => $("#drawboard").removeChild(cell));

  // Add new cells
  // TOTAL width/height = 500
  let cellSize = Math.floor(300 / nRows);
  $("#drawboard").style.gridTemplateColumns = `repeat(${nCols}, ${cellSize}px)`;
  $("#drawboard").style.gridTemplateRows = `repeat(${nRows}, ${cellSize}px)`;
  for (let i = 0; i < nRows * nCols; i++) {
    let cell = document.createElement("button");
    cell.setAttribute("draggable", false);
    cell.addEventListener("mouseover", function (e) {
      if (mouseDown > 0) this.style.backgroundColor = curColor;
    });
    cell.addEventListener("mousedown", function (e) {
      mouseDown = 1;
      this.style.backgroundColor = curColor;
    });
    $("#drawboard").appendChild(cell);
  }
}

fillBoard(16, 16);

$("#resize-button").addEventListener("click", function (e) {
  let size;
  do {
    size = +prompt("Enter board size: ");
  } while (isNaN(size));
  fillBoard(size, size);
});

$$("#color-select>button").forEach((colorButton) => {
  const colorKey = colorButton.getAttribute("key-value");
  colorButton.style.backgroundColor = gameboyColors[colorKey];
  colorButton.addEventListener("click", (e) => {
    curColor = gameboyColors[colorKey];
  });
});
