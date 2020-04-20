var cols, rows;
var w = 10; // Cell Size
var cells = [];
var stack = [];
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

  // Set current cell to visited and set current to be hightlighted
  current.visited = true;
  current.highlight();

  // Gets one random neighbour, this will be the next one to visit
  var next = current.checkNeighbours();
  // If there is a unvisted neighbour. Set it visited > add to stack > remove the wall between them > change current to it,
  if (next) {
    next.visited = true;
    stack.push(current);
    removeWalls(current, next);
    current = next;
    // If we are stuck (thus there are no unvisted neighbours). We go back in the stack till we find one. (See Readme for information)
  } else if (stack.length > 0) {
    // Basicly go back one cell. So the cell before the current one will be checked for free neighbours again.
    var cell = stack.pop();
    current = cell;
  }
}

function Index(y, x) {
  if (x < 0 || y < 0 || x > cols - 1 || y > rows - 1) {
    return -1;
  }
  return x + y * cols;
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

    // Adding neighbour to array if its unvisited and is no edge.
    if (top && !top.visited) {
      neighbours.push(top);
    }
    if (right && !right.visited) {
      neighbours.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbours.push(bottom);
    }
    if (left && !left.visited) {
      neighbours.push(left);
    }

    // If there are unvisted neighbours, return a random one.
    if (neighbours.length > 0) {
      var ran = floor(random(0, neighbours.length));
      return neighbours[ran];
    } else {
      return undefined;
    }
  };

  // Highlights the 'Bot', aka current cell
  this.highlight = function() {
    var x = this.x * w;
    var y = this.y * w;
    noStroke();
    fill(0, 50, 200, 200);
    rect(x, y, w, w);
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
      noStroke();
      fill(255, 0, 200, 100);
      rect(x, y, w, w);
    }
  };
}

function removeWalls(a, b) {

  // Remove left/right walls
  var x = a.x - b.x;
  if (x === 1) {
    a.walls[3] = false; // Remove right wall
    b.walls[1] = false; // Remove left wall
  } else if (x === -1) {
    a.walls[1] = false; // Remove right wall
    b.walls[3] = false; // Remove left wall
  }

  // Remove bottom/top walls
  var y = a.y - b.y;
  if (y === 1) {
    a.walls[0] = false; // Remove right wall
    b.walls[2] = false; // Remove left wall
  } else if (y === -1) {
    a.walls[2] = false; // Remove right wall
    b.walls[0] = false; // Remove left wall
  }
}
