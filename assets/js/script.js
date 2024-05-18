// grid
// user can create blocks
// add path find algo

let dir = {x: 400, y: 300}
const endCoords = {x: 400, y: 30}
const wallCoords = [
  {x: 100, y: 200},
  {x: 50, y: 450},
  {x: 300, y: 30},
  {x: 450, y: 120},
  {x: 250, y: 400},
  {x: 10, y: 10},
  {x: 400, y: 250},
  {x: 320, y: 60},
  {x: 220, y: 330},
  {x: 80, y: 480},
  {x: 140, y: 60},
  {x: 500, y: 100},
  {x: 270, y: 150},
  {x: 30, y: 220},
  {x: 410, y: 360},
  {x: 190, y: 80},
  {x: 350, y: 240},
  {x: 110, y: 370},
  {x: 290, y: 300},
  {x: 70, y: 50},
  {x: 430, y: 140},
  {x: 360, y: 470},
  {x: 20, y: 330},
  {x: 200, y: 90},
  {x: 500, y: 500},
  {x: 120, y: 230},
  {x: 340, y: 110},
  {x: 460, y: 70},
  {x: 210, y: 410},
  {x: 90, y: 40},
  {x: 150, y: 300},
  {x: 390, y: 210},
  {x: 480, y: 160},
  {x: 40, y: 100},
  {x: 310, y: 340},
  {x: 130, y: 420},
  {x: 220, y: 50},
  {x: 490, y: 200},
  {x: 300, y: 450},
  {x: 60, y: 140},
  {x: 170, y: 20},
  {x: 250, y: 250},
  {x: 470, y: 430},
  {x: 330, y: 180},
  {x: 140, y: 490},
  {x: 380, y: 280},
  {x: 70, y: 370},
  {x: 200, y: 300},
  {x: 440, y: 50},
  {x: 110, y: 170},
  {x: 160, y: 350},
  {x: 370, y: 190},
  {x: 50, y: 480},
  {x: 270, y: 70},
  {x: 300, y: 320},
  {x: 500, y: 260},
  {x: 240, y: 130},
  {x: 420, y: 370},
  {x: 60, y: 200},
  {x: 250, y: 90},
  {x: 130, y: 300},
  {x: 470, y: 310},
  {x: 80, y: 420},
  {x: 190, y: 250},
  {x: 290, y: 130},
  {x: 340, y: 380},
  {x: 50, y: 60},
  {x: 410, y: 20},
  {x: 300, y: 470},
  {x: 220, y: 270},
  {x: 10, y: 140},
  {x: 500, y: 30},
  {x: 120, y: 380},
  {x: 370, y: 90},
  {x: 90, y: 210},
  {x: 460, y: 280},
  {x: 310, y: 50},
  {x: 170, y: 340},
  {x: 20, y: 460},
  {x: 250, y: 200},
  {x: 440, y: 180},
  {x: 70, y: 330},
  {x: 380, y: 70},
  {x: 130, y: 250},
  {x: 490, y: 320},
  {x: 160, y: 490},
  {x: 290, y: 40},
  {x: 400, y: 210},
  {x: 200, y: 120},
  {x: 470, y: 50},
  {x: 340, y: 330},
  {x: 30, y: 400},
  {x: 190, y: 310},
  {x: 220, y: 10},
  {x: 350, y: 70},
  {x: 480, y: 90},
  {x: 110, y: 240},
  {x: 260, y: 460},
  {x: 20, y: 100}
]



function setup() {
  createCanvas(500, 500)
}

// pixel ticker
const timer = setInterval(() => {
  // check next step if has wall, if true stop else move
  // if(dir.x <= 490) {
  //   dir.x += 10
  // }

  console.log(!wallCoords.find(el => dir.x + 10 == el.x && dir.y == el.y))
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
    const roundedX = Math.floor(mouseX / 10) * 10;
    const roundedY = Math.floor(mouseY / 10) * 10;
    console.log(roundedX, roundedY)
    fill(0)
    rect(roundedX, roundedY, 10, 10)
  }
}