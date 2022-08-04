const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

const validSizes = [8, 16, 32, 64, 128];
const gameboyColors = [
  "rgb(155, 188, 15)",
  "rgb(139, 172, 15)",
  "rgb(48, 98, 48)",
  "rgb(15, 56, 15)",
];
var curColor = gameboyColors[3];

function getRandColor() {
  let index = Math.floor(Math.random() * gameboyColors.length);
  return gameboyColors[index];
}

var mouseDown = 0;
document.body.onmouseup = () => {
  mouseDown = 0;
};

function fillCell(cell) {
  if (curColor === "random") {
    //cell.style.backgroundColor = getRandColor();
    let curIndex = gameboyColors.indexOf(cell.style.backgroundColor);
    cell.style.backgroundColor =
      gameboyColors[Math.min(curIndex + 1, gameboyColors.length - 1)];
    // Find current index of current background color
    // Increase by 1, max len-1 of gameboyColors
  } else {
    cell.style.backgroundColor = curColor;
  }
}

function fillBoard(size) {
  // Clear old cells
  $$("#drawboard>button").forEach((cell) => $("#drawboard").removeChild(cell));

  // Add new cells
  // TOTAL width/height = 500
  let cellSize = Math.floor(256 / size);
  console.log(`cellSize: ${cellSize}`);
  $("#drawboard").style.gridTemplateColumns = `repeat(${size}, ${cellSize}px)`;
  $("#drawboard").style.gridTemplateRows = `repeat(${size}, ${cellSize}px)`;
  for (let i = 0; i < size * size; i++) {
    let cell = document.createElement("button");
    cell.setAttribute("draggable", false);
    cell.style.backgroundColor = gameboyColors[0];
    cell.addEventListener("mouseover", function (e) {
      if (mouseDown > 0) {
        fillCell(this);
      }
    });
    cell.addEventListener("mousedown", function (e) {
      mouseDown = 1;
      fillCell(this);
    });
    $("#drawboard").appendChild(cell);
  }
}

const initialSize = validSizes[$("#resize-slider").value];
fillBoard(initialSize, initialSize);

$$("#color-select>button").forEach((colorButton) => {
  const colorKey = colorButton.getAttribute("key-value");
  colorButton.style.backgroundColor = gameboyColors[colorKey];
  colorButton.addEventListener("click", (e) => {
    curColor = gameboyColors[colorKey];
  });
});

$("#clear-button").addEventListener("click", (e) => {
  $$("#drawboard>button").forEach((cell) => {
    cell.style.backgroundColor = gameboyColors[0];
  });
});

$("#random-button").addEventListener("click", (e) => {
  curColor = "random";
});

$("#resize-text").textContent = `${initialSize}x${initialSize}`;
$("#resize-slider").addEventListener("input", function (e) {
  let size = validSizes[this.value];
  $("#resize-text").textContent = `${size}x${size}`;
});

$("#resize-slider").addEventListener("mouseup", function (e) {
  let size = validSizes[this.value];
  console.log(`Refill board: ${size}`);
  fillBoard(size);
});
