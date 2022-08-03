const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

function fillBoard(nRows, nCols) {
  $("#drawboard").style.gridTemplateColumns = `repeat(${nCols}, 20px)`;
  $("#drawboard").style.gridTemplateRows = `repeat(${nRows}, 20px)`;
  for (let i = 0; i < nRows * nCols; i++) {
    let cell = document.createElement("div");
    $("#drawboard").appendChild(cell);
  }
}

fillBoard(16, 16);

$$("#drawboard>div").forEach((cell) =>
  cell.addEventListener("mouseover", function (e) {
    this.style.backgroundColor = "cyan";
  })
);
