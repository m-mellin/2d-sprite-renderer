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

const character = new Sprite('assets/orc1_walk_full.png', {x: 10, y: 10, width: 64 * scale, height: 64 * scale})

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

const idleUpRegion = [
  new SpriteRegion({x: 0, y: 0, width: 64, height: 64}),
  new SpriteRegion({x: 64, y: 0, width: 64, height: 64}),
  new SpriteRegion({x: 128, y: 0, width: 64, height: 64}),
  new SpriteRegion({x: 192, y: 0, width: 64, height: 64}),
]

const idleDownRegion = [
  new SpriteRegion({x: 0, y: 64, width: 64, height: 64}),
  new SpriteRegion({x: 64, y: 64, width: 64, height: 64}),
  new SpriteRegion({x: 128, y: 64, width: 64, height: 64}),
  new SpriteRegion({x: 192, y: 64, width: 64, height: 64}),
]

const idleRightRegion = [
  new SpriteRegion({x: 0, y: 128, width: 64, height: 64}),
  new SpriteRegion({x: 64, y: 128, width: 64, height: 64}),
  new SpriteRegion({x: 128, y: 128, width: 64, height: 64}),
  new SpriteRegion({x: 192, y: 128, width: 64, height: 64}),
]

const idleLeftRegion = [
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

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown') {
    currentAnimation = walkingDown
    character.y += 5
  }

  if (event.key === 'ArrowUp') {
    currentAnimation = walkingUp
    character.y -= 5
  }

  if (event.key === 'ArrowLeft') {
    currentAnimation = walkingLeft
    character.x -= 5
  }

  if (event.key === 'ArrowRight') {
    currentAnimation = walkingRight
    character.x += 5
  }
})

document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowDown') {
    currentAnimation = idleDown
  }

  if (event.key === 'ArrowUp') {
    currentAnimation = idleUp
  }

  if (event.key === 'ArrowLeft') {
    currentAnimation = idleLeft
  }

  if (event.key === 'ArrowRight') {
    currentAnimation = idleRight
  }
})

let previousTimestamp = 0;

function gameLoop (timestamp) {
  const deltaTime = timestamp - previousTimestamp
  previousTimestamp = timestamp

  currentAnimation.update(deltaTime)

  character.region = currentAnimation.region

  renderer.render()

  requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)

// import { Sprite } from '../src/Sprite.js'
// import { SpriteRenderer } from '../src/SpriteRenderer.js'
// import { SpriteAnimation } from '../src/SpriteAnimation.js'
// import { SpriteRegion } from '../src/SpriteRegion.js'

// const canvas = document.createElement('canvas')
// canvas.width = 1920
// canvas.height = 1080

// const renderer = new SpriteRenderer(canvas)

// const body = document.querySelector('body')

// body.appendChild(canvas)

// for (let j = 0; j < (canvas.height/32); j++) {
//   for (let i = 0; i < (canvas.width/32); i++) {
//     const grass = new Sprite('assets/grass2.png', {x: 32 * i, y: j * 32, width: 32, height: 32})
//     renderer.add(grass)
//   }
// }

// const idleFrames = [
//   new SpriteRegion({ x: 0, y: 0, width: 57, height: 66 }),
//   new SpriteRegion({ x: 84, y: 0, width: 57, height: 66 }),
//   new SpriteRegion({ x: 167, y: 0, width: 57, height: 66 }),
//   new SpriteRegion({ x: 248, y: 0, width: 57, height: 66 })
// ]

// const walkingFrames = [
//   new SpriteRegion({ x: 0, y: 99, width: 57, height: 66 }),
//   new SpriteRegion({ x: 84, y: 99, width: 57, height: 66 }),
//   new SpriteRegion({ x: 167, y: 99, width: 57, height: 66 }),
//   new SpriteRegion({ x: 248, y: 99, width: 57, height: 66 })
// ]

// const walking = new SpriteAnimation(walkingFrames, 100)
// const idle = new SpriteAnimation(idleFrames, 150)

// let currentAnimation = idle

// document.addEventListener('keydown', (event) => {
//   if (event.key === 'ArrowRight') {
//     currentAnimation = walking
//     character.x += 5
//   }

//   if (event.key === 'ArrowLeft') {
//     currentAnimation = walking
//     character.x -= 5
//   }

//   if (event.key === 'ArrowDown') {
//     currentAnimation = walking
//     character.y += 5
//   }

//   if (event.key === 'ArrowUp') {
//     currentAnimation = walking
//     character.y -= 5
//   }
// })

// document.addEventListener('keyup', (event) => {
//   if (event.key === 'ArrowRight') {
//     currentAnimation = idle
//   }
// })

// const character = new Sprite('assets/spritesheet.png', {x: 5, y: 5, width: 60, height: 50})

// renderer.add(character)
// renderer.render()

// let previousTimestamp = 0

// function gameLoop (timestamp) {
//   const deltaTime = timestamp - previousTimestamp
//   previousTimestamp = timestamp

//   currentAnimation.update(deltaTime)

//   character.region = currentAnimation.region

//   renderer.render()

//   requestAnimationFrame(gameLoop)
// }

// requestAnimationFrame(gameLoop)