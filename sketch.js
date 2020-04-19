var cols, rows;
var w = 40; // Cell Size
var cells = [];
var current;

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

  // Set current to the first cell
  current = cells[0];
}

function draw() {
  background(51);
  // Draw each Cell
  for (var i = 0; i < cells.length; i++) {
    cells[i].show(); // Show certain Cell
  }

  // Set current cell to visited
  current.visited = true;
  current.checkNeighbours();
}

function Index(y, x) {
if (x < 0 || y < 0 || x > cols - 1 || y > rows - 1) {
  return -1;
}
  return y + x * cols;
}

function Cell(y, x) {
  this.x = x;
  this.y = y;
  this.walls = [true, true, true, true]; // Top, Right, Bottom, Left
  this.visited = false;

  // Neighbour check for a specific cell
  this.checkNeighbours = function() {
    var neighbours = [];
    var top = cells[Index(x, y - 1)];
    var right = cells[Index(x + 1, y)];
    var bottom = cells[Index(x, y + 1)];
    var left = cells[Index(x - 1, y)];

    if(top && !top.visited){
      neighbours.push(top);
    }
    if(right && !right.visited){
      neighbours.push(right);
    }
    if(bottom && !bottom.visited){
      neighbours.push(bottom);
    }
    if(left && !left.visited){
      neighbours.push(left);
    }
  };

  // Show function for a specific cell
  this.show = function() {
    var x = this.x * w;
    var y = this.y * w;

    // Draw Walls
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

    // Colors cell if visited
    if (this.visited) {
      fill(255, 0, 200, 100);
      rect(x, y, w, w);
    }
  };
}
