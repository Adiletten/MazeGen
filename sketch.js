var cols, rows;
var w = 40; // Cell Size
var cells = [];

function setup() {
  createCanvas(400, 400);
  cols = floor(width / w);
  rows = floor(height / w);

  // For every row, and for each column in that row. Make a new cell
  for (var x = 0; x < rows; x++) {
    for (var y = 0; y < cols; y++) {
      var cell = new Cell(y, x);
      cells.push(cell);
    }
  }
}

function draw() {
  background(51);
  // Draw each Cell
  for (var i = 0; i < cells.length; i++) {
    cells[i].show(); // Show certain Cell
  }
}

function Cell(y, x) {
  this.x = x;
  this.y = y;
  this.walls = [true, true, true, true]; // Top, Right, Bottom, Left

  // Show function for a specific cell
  this.show = function() {
    var x = this.x * w;
    var y = this.y * w;
    stroke(255);
    if (this.walls[0]) {

      line(x, y, x + w, y); // Top line
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w); // Right line
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w); // Bottom line
    }
    if (this.walls[3]) {
      line(x, y + w, x, y); // Left lines
    }

    // noFill();
    // rect(x, y, w, w);
  };
}
