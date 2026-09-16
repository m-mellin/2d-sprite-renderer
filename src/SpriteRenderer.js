export class SpriteRenderer {
  #canvas
  #context
  #sprites = []
  #frame = null

  constructor (canvas) {
    this.#canvas = canvas
    this.#context = canvas.getContext('2d')
  }

  add (sprite) {
    this.#sprites.push(sprite)

    if (!sprite.isLoaded) {
      sprite.waitForLoad()
        .then(() => this.render())
        .catch(() => {})
    }
  }

  remove (sprite) {
    const index = this.#sprites.indexOf(sprite)

    if (index !== -1) {
      this.#sprites.splice(index, 1)
    }
  }

  clear () {
    this.#sprites = []
    this.#clearCanvas()
  }

  #clearCanvas() {
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
  }

  // Om en render redan kallats, return. Annars lägg in id i #frame och rendera. (Undvik dubbelrendering)
  scheduleRender () {
    if (this.#frame !== null) return

    this.#frame = requestAnimationFrame(() => {
      this.#frame = null
      this.render()
    })
  }

  render () {
    this.#clearCanvas()

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