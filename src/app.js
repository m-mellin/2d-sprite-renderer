import { Sprite } from '../src/Sprite.js'
import { SpriteRenderer } from '../src/SpriteRenderer.js'
import { SpriteAnimation } from './SpriteAnimation.js'
import { SpriteRegion } from './SpriteRegion.js'

const canvas = document.createElement('canvas')
canvas.width = 1920
canvas.height = 1080

const renderer = new SpriteRenderer(canvas)

const body = document.querySelector('body')

body.appendChild(canvas)

for (let j = 0; j < (1080/32); j++) {
  for (let i = 0; i < (1920/32); i++) {
    const grass = new Sprite('../src/grass2.png', {x: 32 * i, y: j * 32, width: 32, height: 32})
    renderer.add(grass)
  }
}

const idleFrames = [
  new SpriteRegion(0, 0, 57, 66),
  new SpriteRegion(84, 0, 57, 66),
  new SpriteRegion(167, 0, 57, 66),
  new SpriteRegion(248, 0, 57, 66)
]

const walkingFrames = [
  new SpriteRegion(0, 99, 57, 66),
  new SpriteRegion(84, 99, 57, 66),
  new SpriteRegion(167, 99, 57, 66),
  new SpriteRegion(248, 99, 57, 66)
]

const walking = new SpriteAnimation(walkingFrames, 100)
const idle = new SpriteAnimation(idleFrames, 150)

let currentAnimation = idle

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    currentAnimation = walking
    character.x += 5
  }
})

document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowRight') {
    currentAnimation = idle
  }
})

const character = new Sprite('../src/spritesheet.png',{x: 100, y: 100, width: 60, height: 64, region: idle.region}
)

renderer.add(character)

let previousTimestamp = 0

function gameLoop (timestamp) {
  const deltaTime = timestamp - previousTimestamp
  previousTimestamp = timestamp

  currentAnimation.update(deltaTime)
  character.region = currentAnimation.region

  renderer.render()

  requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)