let dir = {x: 200, y: 300}
const endCoords = {x: 400, y: 30}
let wallCoords = []
let pathCoord = []
let ticker, endTicker
let isStarted = true
let isStop = false
let isDrawing = false

function setup() {
  createCanvas(500, 500)
}

function startTicker(coords) {
  if(isStop) return
  // pixel ticker
  // timer = setInterval(() => {
  //   if(isStop) return
  //   // check next step if has wall, if true stop else move
  //   if(dir.x < endCoords.x && !wallCoords.find(el => dir.x + 10 == el.x && dir.y == el.y)) {
  //     dir.x += 10
  //   }
  //   if(dir.x > endCoords.x && !wallCoords.find(el => dir.x - 10 == el.x && dir.y == el.y)) {
  //     dir.x -= 10
  //   }
  //   if(dir.y < endCoords.y && !wallCoords.find(el => dir.y + 10 == el.y && dir.x == el.x)) {
  //     dir.y += 10
  //   }
  //   if(dir.y > endCoords.y && dir.y > 30 + 10 && !wallCoords.find(el => dir.y - 10 == el.y && dir.x == el.x)) {
  //     dir.y -= 10
  //   }
  // }, 250)

  // endTicker = setInterval(() => {
  //   if(isStop) return
  //   const randomX = Math.floor(random(0, 490) / 10) * 10
  //   const randomY = Math.floor(random(0, 490) / 10) * 10
  //   endCoords.x = randomX 
  //   endCoords.y = randomY
  // }, 5000)
  if(coords) {
    for (let i = 0; i < coords.length; i++) {
      setTimeout(() => {
        dir.x = coords[i].x
        dir.y = coords[i].y
      }, i * 500)
    }
  } else {
    alert("Path is closed.")
  }
}


function draw() {
  clear()
  // create blocks
  if(mouseIsPressed) {
    const roundedX = Math.floor(mouseX / 10) * 10
    const roundedY = Math.floor(mouseY / 10) * 10

    if(isDrawing && roundedX >= 0 && roundedX <= 500 && roundedY >= 0 && roundedY <= 500) {
      if(wallCoords.find(el => el.x == roundedX && el.y == roundedY) || endCoords.x == roundedX && endCoords.y == roundedY || dir.x == roundedX && dir.y == roundedY) {
        // do nothing if coords already has wall/end/pixel coords
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

function generateNextPath(currCoord, endCoords, wallCoords) {
  const moves = [
      { x: 0, y: -10 },  // Up
      { x: 0, y: 10 },   // Down
      { x: -10, y: 0 },  // Left
      { x: 10, y: 0 }    // Right
  ]

  function heuristic(a, b) {
      return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
  }

  // Priority Queue implementation using a simple array and sort
  const openList = [{ ...currCoord, g: 0, h: heuristic(currCoord, endCoords), f: heuristic(currCoord, endCoords) }]
  const closedList = new Set()
  const wallSet = new Set(wallCoords.map(wall => `${wall.x},${wall.y}`))

  while (openList.length > 0) {
      // Sort openList to get the node with the lowest f value
      openList.sort((a, b) => a.f - b.f)
      const current = openList.shift()
      const currentKey = `${current.x},${current.y}`

      // If the current node is the goal, reconstruct and return the path
      if (current.x === endCoords.x && current.y === endCoords.y) {
          return reconstructPath(current)
      }

      closedList.add(currentKey)

      for (const move of moves) {
          const neighbor = {
              x: current.x + move.x,
              y: current.y + move.y,
              parent: current
          }
          const neighborKey = `${neighbor.x},${neighbor.y}`

          if (
              neighbor.x >= 0 && neighbor.x < 500 &&
              neighbor.y >= 0 && neighbor.y < 500 &&
              !wallSet.has(neighborKey) &&
              !closedList.has(neighborKey)
          ) {
              const tentativeG = current.g + 10
              const existingNode = openList.find(node => node.x === neighbor.x && node.y === neighbor.y)

              if (!existingNode || tentativeG < existingNode.g) {
                  neighbor.g = tentativeG
                  neighbor.h = heuristic(neighbor, endCoords)
                  neighbor.f = neighbor.g + neighbor.h

                  if (existingNode) {
                      // Update the existing node
                      Object.assign(existingNode, neighbor)
                  } else {
                      // Add new node to the open list
                      openList.push(neighbor)
                  }
              }
          }
      }
  }

  return null

  function reconstructPath(node) {
      const path = []
      while (node) {
          path.push({ x: node.x, y: node.y })
          node = node.parent
      }
      return path.reverse()
  }
}

// UI
const start = document.querySelector(".start")
const stopBtn = document.querySelector(".stop")
const wall = document.querySelector(".wall")
const erase = document.querySelector(".erase")
const reset = document.querySelector(".reset")
const resetPos = document.querySelector(".reset-pos")

start.addEventListener("click", () => {
  isStarted = true
  start.classList.add("disabled")
  stopBtn.classList.remove("disabled")
  wall.classList.add("disabled")
  erase.classList.add("disabled")
  reset.classList.add("disabled")
  resetPos.classList.add("disabled")
  isStop = false
  pathCoord = generateNextPath(dir, endCoords, wallCoords)
  startTicker(pathCoord)
})

stopBtn.addEventListener("click", () => {
  isStarted = false
  start.classList.remove("disabled")
  stopBtn.classList.add("disabled")
  wall.classList.remove("disabled")
  erase.classList.remove("disabled")
  reset.classList.remove("disabled")
  resetPos.classList.remove("disabled")
  isStop = true
  pathCoord = []
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

resetPos.addEventListener("click", () => {
  dir.x = Math.floor(random(0, 490) / 10) * 10
  dir.y = Math.floor(random(0, 490) / 10) * 10
  endCoords.x = Math.floor(random(0, 490) / 10) * 10
  endCoords.y = Math.floor(random(0, 490) / 10) * 10
})


// to fixed
// path coords update