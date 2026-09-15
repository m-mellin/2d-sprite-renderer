import { Sprite } from '../src/Sprite.js'
import { SpriteRenderer } from '../src/SpriteRenderer.js'

const canvas = document.querySelector('#test')
const renderer = new SpriteRenderer(canvas)

const mario = new Sprite('../src/mario.bmp', 0, 0)

renderer.add(mario)

await renderer.render()
