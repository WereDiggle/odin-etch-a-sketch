const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

function fillBoard(nRows, nCols) {
  // Clear old cells
  $$("#drawboard>div").forEach((cell) => $("#drawboard").removeChild(cell));

  // Add new cells
  $("#drawboard").style.gridTemplateColumns = `repeat(${nCols}, 20px)`;
  $("#drawboard").style.gridTemplateRows = `repeat(${nRows}, 20px)`;
  for (let i = 0; i < nRows * nCols; i++) {
    let cell = document.createElement("div");
    cell.addEventListener("mouseover", function (e) {
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
