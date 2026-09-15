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

  #clear () {
    this.#context.clearRect(0, 0, 800, 600)
  }

  async render () {
    this.#clear()

    for (const sprite of this.#sprites) {
      await sprite.waitForLoad()

      this.#context.drawImage(
        sprite.image,
        sprite.positionX,
        sprite.positionY
      )
    }
  }
}