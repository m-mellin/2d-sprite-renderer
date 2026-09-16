import { Sprite } from '../src/Sprite.js'
import { SpriteRenderer } from '../src/SpriteRenderer.js'
import { SpriteRegion } from './SpriteRegion.js'

const canvas = document.createElement('canvas')
canvas.width = 1920
canvas.height = 1080

const renderer = new SpriteRenderer(canvas)

const body = document.querySelector('body')

body.appendChild(canvas)

for (let j = 0; j < (1080/32); j++) {
  for (let i = 0; i < (1920/32); i++) {
    const grass = new Sprite('../src/grass2.png', 32 * i, j * 32, 32, 32)
    renderer.add(grass)
  }
}

const x = 77.625
const y = 87.2

const frame = {
  x: 2,
  y: 3
}

const region = new SpriteRegion(x * frame.x, y * frame.y, 60, 64)
const character = new Sprite('../src/spritesheet.png', 0, 0, 60, 64, region)

renderer.add(character)

document.addEventListener('keydown', async (event) => {
  if (event.key == 'ArrowUp') {
    character.positionY -= 32
  }

  if (event.key == 'ArrowDown') {
    character.positionY += 32
  }

  if (event.key == 'ArrowRight') {
    character.positionX += 32
  }

  if (event.key == 'ArrowLeft') {
    character.positionX += 32
  }

  if (event.key == 'Enter') {
    renderer.remove(character)
  }

  if (event.key == 'Backspace') {
    renderer.clear()
  }

  renderer.render()
})


renderer.render()
