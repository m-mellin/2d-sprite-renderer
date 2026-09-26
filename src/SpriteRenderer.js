/**
 * Renders sprites on an HTML canvas.
 * 
 * Manages a collection of sprites and draws them on the canvas
 * using their position, size and image region.
 */
export class SpriteRenderer {
  /**
   * The canvas asset rendered on.
   * 
   * @type {HTMLCanvasElement}
   * @private
   */
  #canvas

  /**
   * The 2D rendering context of the canvas.
   * 
   * @type {CanvasRenderingContext2D}
   */
  #context

  /**
   * The sprited managed by the renderer.
   * 
   * @type {Array<Sprite>}
   * @private
   */
  #sprites = []

  /**
   * The ID of the scheduled animation frame.
   * 
   * @type {number|null}
   * @private
   */
  #frame = null

  /**
   * Creates a SpriteRenderer.
   * 
   * @param {HTMLCanvasElement} canvas - Canvas used to render sprites on.
   */
  constructor (canvas) {
    this.#canvas = canvas
    this.#setContext()
  }

  /**
   * Sets the 2D rendering context of the canvas.
   */
  #setContext() {
    this.#context = this.#canvas.getContext('2d')
  }

  /**
   * Adds a sprite to the renderer.
   * If the sprite is not loaded yet, a render is scheduled once it has loaded.
   *
   * @param {Sprite} sprite - Sprite to add.
   */
  add (sprite) {
    this.#sprites.push(sprite)

    if (!sprite.isLoaded) {
      this.#renderWhenLoaded(sprite)
    }
  }

  /**
   * Removes a sprite from the renderer.
   * 
   * Does nothing if the sprite is not in the renderer.
   * 
   * @param {Sprite} sprite - Sprite to remove.
   */
  remove (sprite) {
    const index = this.#sprites.indexOf(sprite)

    if (index !== -1) {
      this.#sprites.splice(index, 1)
    }
  }

  /**
   * Removes all sprites from the renderer and clears the canvas.
   */
  clear () {
    this.#sprites = []
    this.#clearCanvas()
  }

  /**
   * Clears the canvas
   * 
   * @private
   */
  #clearCanvas() {
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
  }

  /**
   * Schedules a render when the sprite has loaded.
   *
   * @param {Sprite} sprite - The sprite to wait for.
   */
  #renderWhenLoaded (sprite) {
    sprite.waitForLoad()
      .then(() => this.#scheduleRender())
      .catch(() => {})
  }

  /**
   * Schedules a render for the next animation frame.
   * 
   * Does nothing if the render is already scheduled.
   * 
   * @private
   */
  #scheduleRender () {
    if (this.#frame !== null) return

    this.#frame = requestAnimationFrame(() => {
      this.#frame = null
      this.render()
    })
  }
  

  /**
   * Renders all loaded sprites on the canvas
   */
  render () {
    this.#clearCanvas()

    for (const sprite of this.#sprites) {
      this.#drawSprite(sprite)
    }
  }

  /**
   * Draws a loaded sprite using either its whole image or a selected region.
   *
   * @param {Sprite} sprite - Sprite to draw.
   */
  #drawSprite (sprite) {
    if (!sprite.isLoaded) return

    if (sprite.region) {
      this.#drawRegion(sprite)
    } else {
      this.#drawWhole(sprite)
    }
  }

  /**
   * Draws a selected region of a sprite's image on the canvas.
   *
   * @param {Sprite} sprite - Sprite containing the image region to draw.
   */
  #drawRegion (sprite) {
    const region = sprite.region

    this.#context.drawImage(
      sprite.image,
      region.x,
      region.y,
      region.width,
      region.height,
      sprite.x,
      sprite.y,
      sprite.width,
      sprite.height
    )
  }

  /**
   * Draws the entire image of a sprite on the canvas.
   *
   * @param {Sprite} sprite - Sprite to draw.
   */
  #drawWhole (sprite) {
    this.#context.drawImage(
      sprite.image,
      sprite.x,
      sprite.y,
      sprite.width,
      sprite.height
    )
  }
}