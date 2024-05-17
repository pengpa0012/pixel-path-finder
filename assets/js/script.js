// grid
// add pixel
// user can create blocks
// add end 
// add path find algo

let dir = {x: 250, y: 250}

function setup() {
  createCanvas(500, 500)
}

// pixel ticker
const timer = setInterval(() => {
  const nextX = Math.random() * 2 > 1 ? 10 : -10
  const nextY = Math.random() * 2 > 1 ? 10 : -10
  dir.x += nextX
  dir.y += nextY

}, 500)

function draw() {
  clear()
  fill(0)
  noStroke()
  rect(Math.min(Math.max(dir.x, 0), 500), Math.min(Math.max(dir.y, 0), 500), 10, 10)

  // create blocks
  if(mouseIsPressed) {
    const roundedX = Math.floor(mouseX / 10) * 10;
    const roundedY = Math.floor(mouseY / 10) * 10;
    console.log(roundedX, roundedY)
    rect(roundedX, roundedY, 10, 10)
  }
}