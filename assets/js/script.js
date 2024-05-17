// grid
// add pixel
// user can create blocks
// add end 
// add path find algo

let dir = {x: 250, y: 0}

function setup() {
  createCanvas(500, 500)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}


// pixel ticker
const timer = setInterval(() => {
  if(dir.x == 490) {
    clearInterval(timer)
    return
  }
  dir.x += 10
}, 100)

function draw() {
  clear()
  fill(0)
  rect(250, 250, 10, 10)
  rect(dir.x, 0, 10, 10)



  // create blocks
  if(mouseIsPressed) {
    const roundedX = Math.floor(mouseX / 10) * 10;
    const roundedY = Math.floor(mouseY / 10) * 10;
    console.log(roundedX, roundedY)
    rect(roundedX, roundedY, 10, 10)
  }
}