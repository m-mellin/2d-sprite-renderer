import { Sprite } from '../src/Sprite.js'

export class SpriteRenderer {
  #canvas
  #context
  #sprites = []

  constructor (canvas) {
    this.#canvas = canvas
    this.#context = canvas.getContext('2d')
  }

  add (sprite) {
    this.#sprites.push(sprite)
  }

  remove (sprite) {
    const index = this.#sprites.indexOf(sprite)

    if (index !== -1) {
      this.#sprites.splice(index, 1)
    }
  }

  clear () {
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
  }

  render () {
    this.clear()

    for (const sprite of this.#sprites) {
      if (!sprite.isLoaded) continue

      this.#context.drawImage(
        sprite.image,
        sprite.positionX,
        sprite.positionY,
        sprite.width,
        sprite.height
      )
    }
  }
}