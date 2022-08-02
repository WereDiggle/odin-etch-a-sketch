const $ = (q) => document.querySelector(q);

function fillBoard(nRows, nCols) {
  $("#drawboard").style.gridTemplateColumns = `repeat(${nCols}, 20px)`;
  $("#drawboard").style.gridTemplateRows = `repeat(${nRows}, 20px)`;
  for (let i = 0; i < nRows * nCols; i++) {
    let cell = document.createElement("div");
    $("#drawboard").appendChild(cell);
  }
}

fillBoard(16, 32);
