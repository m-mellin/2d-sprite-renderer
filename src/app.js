import { Sprite } from '../src/Sprite.js'
import { SpriteRenderer } from '../src/SpriteRenderer.js'

const canvas = document.createElement('canvas')
canvas.width = 1920
canvas.height = 1080

const renderer = new SpriteRenderer(canvas)

const body = document.querySelector('body')

body.appendChild(canvas)

for (let j = 0; j < (1080/32); j++) {
  for (let i = 0; i < (1920/32); i++) {
    const grass = new Sprite('../src/grass.bmp', 32 * i, j * 32, 32, 32)
    renderer.add(grass)
  }
}

const mario = new Sprite('../src/mario.bmp', 0, 0, 32, 32)
renderer.add(mario)

document.addEventListener('keydown', async (event) => {
  if (event.key == 'ArrowUp') {
    mario.positionY = mario.positionY - 32
  }

  if (event.key == 'ArrowDown') {
    mario.positionY = mario.positionY + 32
  }

  if (event.key == 'ArrowRight') {
    mario.positionX = mario.positionX + 32
  }

  if (event.key == 'ArrowLeft') {
    mario.positionX = mario.positionX - 32
  }

  await renderer.render()
})


await renderer.render()
