const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

var mouseDown = 0;
document.body.onmouseup = () => {
  mouseDown = 0;
};

function fillBoard(nRows, nCols) {
  // Clear old cells
  $$("#drawboard>button").forEach((cell) => $("#drawboard").removeChild(cell));

  // Add new cells
  // TOTAL width/height = 500
  let cellSize = Math.floor(500 / nRows);
  $("#drawboard").style.gridTemplateColumns = `repeat(${nCols}, ${cellSize}px)`;
  $("#drawboard").style.gridTemplateRows = `repeat(${nRows}, ${cellSize}px)`;
  for (let i = 0; i < nRows * nCols; i++) {
    let cell = document.createElement("button");
    cell.setAttribute("draggable", false);
    cell.addEventListener("mouseover", function (e) {
      if (mouseDown > 0) this.style.backgroundColor = "cyan";
    });
    cell.addEventListener("mousedown", function (e) {
      mouseDown = 1;
      this.style.backgroundColor = "cyan";
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
