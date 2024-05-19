// grid
// add path find algo
// add menu for stop, play, add/remove wall/end/pixel point,

let dir = {x: 200, y: 300}
const endCoords = {x: 400, y: 30}
const reachedCells = []
let wallCoords = []
let ticker, endTicker
let isStarted = true
let isStop = false
let isDrawing = false

function setup() {
  createCanvas(500, 500)
}

function startTicker() {
  // pixel ticker
  timer = setInterval(() => {
    if(isStop) return
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
    // const {x, y} = generatePath(dir, endCoords, wallCoords)
    // dir.x += x
    // dir.y += y
  }, 250)

  endTicker = setInterval(() => {
    if(isStop) return
    const randomX = Math.floor(random(0, 490) / 10) * 10
    const randomY = Math.floor(random(0, 490) / 10) * 10
    endCoords.x = randomX 
    endCoords.y = randomY
  }, 5000)
}

startTicker()

function draw() {
  clear()
  // create blocks
  if(mouseIsPressed) {
    const roundedX = Math.floor(mouseX / 10) * 10
    const roundedY = Math.floor(mouseY / 10) * 10

    if(isDrawing && roundedX >= 0 && roundedX <= 500 && roundedY >= 0 && roundedY <= 500) {
      if(wallCoords.find(el => el.x == roundedX && el.y == roundedY)) {
        // do nothing if coords already has wall 
      } else {
        wallCoords.push({x: roundedX, y: roundedY})
      }
    } else {
      const index = wallCoords.findIndex(el => el.x == roundedX && el.y == roundedY)
      // delete if wall exist
      if(index > -1) wallCoords.splice(index, 1)
    }
  }

  fill(0)
  noStroke()
  rect(Math.min(Math.max(dir.x, 0), 500), Math.min(Math.max(dir.y, 0), 500), 10, 10)
  fill(136, 8, 8)
  rect(endCoords.x, endCoords.y, 10, 10)
  fill(8, 143, 143)
  for(let i in wallCoords) {
    rect(wallCoords[i].x, wallCoords[i].y, 10, 10)
  }
}


// function generateNextPath(currCoord, endCoords, wallCoords) {
//   // check current coords if valid coords
//   // the dir here should be next cell (i think)
//   const isValidCoords = currCoord.x >= 0 && currCoord.x < 500 && currCoord.y >= 0 && currCoord.y < 500

//   // check if valid path
//   const isValidPath = wallCoords.find(el => el.x !== "path.x" && el.y !== "path.y")

//   // check if path already taken
//   const isPathSeen = reachedCells.find(el => el.x !== "path.x" && el.y !== "path.y")

//   // total distance between start to end coords
//   const distance = Math.abs(currCoord.x - endCoords.x) + Math.abs(currCoord.y - endCoords.y)

//   // presumably return the next best path (x, y)
//   return "correct path"
// }


// UI
const start = document.querySelector(".start")
const stopBtn = document.querySelector(".stop")
const wall = document.querySelector(".wall")
const erase = document.querySelector(".erase")
const reset = document.querySelector(".reset")

start.addEventListener("click", () => {
  isStarted = true
  start.classList.add("disabled")
  stopBtn.classList.remove("disabled")
  isStop = false
})

stopBtn.addEventListener("click", () => {
  isStarted = false
  start.classList.remove("disabled")
  stopBtn.classList.add("disabled")
  isStop = true
})

reset.addEventListener("click", () => {
  wallCoords = []
})

wall.addEventListener("click", () => {
  isDrawing = true
  wall.classList.add("disabled")
  erase.classList.remove("disabled")
})
erase.addEventListener("click", () => {
  isDrawing = false
  wall.classList.remove("disabled")
  erase.classList.add("disabled")
})
reset.addEventListener("click", () => {})
