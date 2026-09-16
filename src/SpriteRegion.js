export class SpriteRegion {
  #sourceX
  #sourceY
  #width
  #height

  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
  // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  constructor (sourceX, sourceY, width, height) {
    this.#sourceX = sourceX
    this.#sourceY = sourceY
    this.#width = width
    this.#height = height
  }

  get sourceX () {
    return this.#sourceX
  }

  get sourceY () {
    return this.#sourceY
  }

  get width () {
    return this.#width
  }

  get height () {
    return this.#height
  }
}