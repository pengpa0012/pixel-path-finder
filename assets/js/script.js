// grid
// add path find algo

let dir = {x: 400, y: 300}
const endCoords = {x: 400, y: 30}
const wallCoords = []



function setup() {
  createCanvas(500, 500)
}

// pixel ticker
const timer = setInterval(() => {
  // check next step if has wall, if true stop else move
  if(dir.x < endCoords.x && !wallCoords.find(el => dir.x + 10 == el.x && dir.y == el.y)) {
    dir.x += 10
  }
  if(dir.x > endCoords.x && !wallCoords.find(el => dir.x - 10 == el.x && dir.y == el.y)) {
    dir.x -= 10
  }
  if(dir.y < endCoords.y && !wallCoords.find(el => dir.y + 10 == el.y && dir.x == el.x)) {
    dir.y += 10
  }
  if(dir.y > endCoords.y && dir.y > 30 + 10 && !wallCoords.find(el => dir.y - 10 == el.y && dir.x == el.x)) {
    dir.y -= 10
  }
  
}, 250)


setInterval(() => {
  const randomX = Math.floor(random(0, 490) / 10) * 10
  const randomY = Math.floor(random(0, 490) / 10) * 10
  endCoords.x = randomX 
  endCoords.y = randomY
}, 5000)

function draw() {
  clear()
  fill(0)
  noStroke()
  rect(Math.min(Math.max(dir.x, 0), 500), Math.min(Math.max(dir.y, 0), 500), 10, 10)
  fill(136, 8, 8)
  rect(endCoords.x, endCoords.y, 10, 10)
  fill(8, 143, 143)
  for(let i in wallCoords) {
    rect(wallCoords[i].x, wallCoords[i].y, 10, 10)
  }

  // create blocks
  if(mouseIsPressed) {
    const roundedX = Math.floor(mouseX / 10) * 10
    const roundedY = Math.floor(mouseY / 10) * 10
    wallCoords.push({x: roundedX, y: roundedY})
  }
}