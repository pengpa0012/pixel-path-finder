// grid
// add pixel
// user can create blocks
// add end 
// add path find algo

let dir = {x: 250, y: 250}
const endCoords = {x: 490, y: 10}

function setup() {
  createCanvas(500, 500)
}

// pixel ticker
const timer = setInterval(() => {
  if(dir.x < endCoords.x) {
    dir.x += 10
  }
  if(dir.x > endCoords.x) {
    dir.x -= 10
  }
  if(dir.y < endCoords.y) {
    dir.y += 10
  }
  if(dir.y > endCoords.y) {
    dir.y -= 10
  }
}, 100)


setInterval(() => {
  const randomX = Math.floor(random(0, 490) / 10) * 10
  const randomY = Math.floor(random(0, 490) / 10) * 10
  endCoords.x = randomX 
  endCoords.y = randomY
}, 1000)

function draw() {
  clear()
  fill(0)
  noStroke()
  rect(Math.min(Math.max(dir.x, 0), 500), Math.min(Math.max(dir.y, 0), 500), 10, 10)
  fill(136, 8, 8)
  rect(endCoords.x, endCoords.y, 10, 10)

  // create blocks
  if(mouseIsPressed) {
    const roundedX = Math.floor(mouseX / 10) * 10;
    const roundedY = Math.floor(mouseY / 10) * 10;
    console.log(roundedX, roundedY)
    rect(roundedX, roundedY, 10, 10)
  }
}