const MAX_LEVEL = 3
let currentLevel = 1

function advanceLevel() {
  currentLevel += 1
  if (currentLevel > MAX_LEVEL) {
    currentLevel = null
  }
}

export { advanceLevel, currentLevel }
