import { Sprite } from '../src/Sprite.js'
import { SpriteRenderer } from '../src/SpriteRenderer.js'
import { SpriteAnimation } from '../src/SpriteAnimation.js'
import { SpriteRegion } from '../src/SpriteRegion.js'

const canvas = document.createElement('canvas')
canvas.width = 1920
canvas.height = 1080

const renderer = new SpriteRenderer(canvas)

const body = document.querySelector('body')
body.appendChild(canvas)

const scale = 4

const walkSrc = 'assets/orc1_walk_full.png'
const idleSrc = 'assets/orc1_idle_full.png'

const character = new Sprite(idleSrc, {x: 10, y: 10, width: 64 * scale, height: 64 * scale})

renderer.add(character)
renderer.render()

const walkDownRegion = [
  new SpriteRegion({x: 0, y: 0, width: 64, height: 64}),
  new SpriteRegion({x: 64, y: 0, width: 64, height: 64}),
  new SpriteRegion({x: 128, y: 0, width: 64, height: 64}),
  new SpriteRegion({x: 192, y: 0, width: 64, height: 64}),
  new SpriteRegion({x: 256, y: 0, width: 64, height: 64}),
  new SpriteRegion({x: 320, y: 0, width: 64, height: 64})
]

const walkUpRegion = [
  new SpriteRegion({x: 0, y: 64, width: 64, height: 64}),
  new SpriteRegion({x: 64, y: 64, width: 64, height: 64}),
  new SpriteRegion({x: 128, y: 64, width: 64, height: 64}),
  new SpriteRegion({x: 192, y: 64, width: 64, height: 64}),
  new SpriteRegion({x: 256, y: 64, width: 64, height: 64}),
  new SpriteRegion({x: 320, y: 64, width: 64, height: 64})
]

const walkLeftRegion = [
  new SpriteRegion({x: 0, y: 128, width: 64, height: 64}),
  new SpriteRegion({x: 64, y: 128, width: 64, height: 64}),
  new SpriteRegion({x: 128, y: 128, width: 64, height: 64}),
  new SpriteRegion({x: 192, y: 128, width: 64, height: 64}),
  new SpriteRegion({x: 256, y: 128, width: 64, height: 64}),
  new SpriteRegion({x: 320, y: 128, width: 64, height: 64})
]

const walkRightRegion = [
  new SpriteRegion({x: 0, y: 192, width: 64, height: 64}),
  new SpriteRegion({x: 64, y: 192, width: 64, height: 64}),
  new SpriteRegion({x: 128, y: 192, width: 64, height: 64}),
  new SpriteRegion({x: 192, y: 192, width: 64, height: 64}),
  new SpriteRegion({x: 256, y: 192, width: 64, height: 64}),
  new SpriteRegion({x: 320, y: 192, width: 64, height: 64})
]

const idleDownRegion = [
  new SpriteRegion({x: 0, y: 0, width: 64, height: 64}),
  new SpriteRegion({x: 64, y: 0, width: 64, height: 64}),
  new SpriteRegion({x: 128, y: 0, width: 64, height: 64}),
  new SpriteRegion({x: 192, y: 0, width: 64, height: 64}),
]

const idleUpRegion = [
  new SpriteRegion({x: 0, y: 64, width: 64, height: 64}),
  new SpriteRegion({x: 64, y: 64, width: 64, height: 64}),
  new SpriteRegion({x: 128, y: 64, width: 64, height: 64}),
  new SpriteRegion({x: 192, y: 64, width: 64, height: 64}),
]

const idleLeftRegion = [
  new SpriteRegion({x: 0, y: 128, width: 64, height: 64}),
  new SpriteRegion({x: 64, y: 128, width: 64, height: 64}),
  new SpriteRegion({x: 128, y: 128, width: 64, height: 64}),
  new SpriteRegion({x: 192, y: 128, width: 64, height: 64}),
]

const idleRightRegion = [
  new SpriteRegion({x: 0, y: 192, width: 64, height: 64}),
  new SpriteRegion({x: 64, y: 192, width: 64, height: 64}),
  new SpriteRegion({x: 128, y: 192, width: 64, height: 64}),
  new SpriteRegion({x: 192, y: 192, width: 64, height: 64}),
]

const walkingDown = new SpriteAnimation(walkDownRegion, 100)
const walkingUp = new SpriteAnimation(walkUpRegion, 100)
const walkingLeft = new SpriteAnimation(walkLeftRegion, 100)
const walkingRight = new SpriteAnimation(walkRightRegion, 100)

const idleDown = new SpriteAnimation(idleDownRegion, 100)
const idleUp = new SpriteAnimation(idleUpRegion, 100)
const idleLeft = new SpriteAnimation(idleLeftRegion, 100)
const idleRight = new SpriteAnimation(idleRightRegion, 100)

let currentAnimation = idleDown

/**
 * Handles keydown events, switching the character to its walking
 * animation and moving it in the pressed arrow key's direction.
 *
 * @param {KeyboardEvent} event - The keydown event.
 * @returns {void}
 */
const handleKeyDown = (event) => {
  if (event.key === 'ArrowDown') {
    character.assignImageAsset(walkSrc)
    currentAnimation = walkingDown
    character.y += 5
  }

  if (event.key === 'ArrowUp') {
    character.assignImageAsset(walkSrc)
    currentAnimation = walkingUp
    character.y -= 5
  }

  if (event.key === 'ArrowLeft') {
    character.assignImageAsset(walkSrc)
    currentAnimation = walkingLeft
    character.x -= 5
  }

  if (event.key === 'ArrowRight') {
    character.assignImageAsset(walkSrc)
    currentAnimation = walkingRight
    character.x += 5
  }
}

/**
 * Handles keyup events, switching the character back to its idle
 * animation for the direction it was last facing.
 *
 * @param {KeyboardEvent} event - The keyup event.
 * @returns {void}
 */
const handleKeyUp = (event) => {
  if (event.key === 'ArrowDown') {
    character.assignImageAsset(idleSrc)
    currentAnimation = idleDown
  }

  if (event.key === 'ArrowUp') {
    character.assignImageAsset(idleSrc)
    currentAnimation = idleUp
  }

  if (event.key === 'ArrowLeft') {
    character.assignImageAsset(idleSrc)
    currentAnimation = idleLeft
  }

  if (event.key === 'ArrowRight') {
    character.assignImageAsset(idleSrc)
    currentAnimation = idleRight
  }
}

document.addEventListener('keydown', handleKeyDown)
document.addEventListener('keyup', handleKeyUp)

let previousTimestamp = 0;

/**
 * Runs the main game loop, updating the current animation and
 * re-rendering the character each frame.
 *
 * @param {number} timestamp - The current frame time, provided by requestAnimationFrame.
 * @returns {void}
 */
function gameLoop (timestamp) {
  const deltaTime = timestamp - previousTimestamp
  previousTimestamp = timestamp

  currentAnimation.update(deltaTime)

  character.region = currentAnimation.region

  renderer.render()

  requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)