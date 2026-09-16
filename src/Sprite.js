import { ImageAsset } from './ImageAsset.js'

export class Sprite {
  #imageAsset
  #xPos
  #yPos
  #width
  #height
  #region

  constructor (src, xPos = 0, yPos = 0, width, height, region = null) {
    this.positionX = xPos
    this.positionY = yPos
    this.#width = width
    this.#height = height
    this.setImageSource(src)
    this.#region = region
  }

  setImageSource (src) {
    this.#imageAsset = ImageAsset.getAsset(src)
  }

  get positionX () {
    return this.#xPos
  }

  set positionX (xPos) {
    if (typeof xPos !== 'number') {
      throw new TypeError('xPos must be a number')
    } else {
      this.#xPos = xPos
    }
  }

  get positionY () {
    return this.#yPos
  }

  set positionY (yPos) {
    if (typeof yPos !== 'number') {
      throw new TypeError('yPos must be a number')
    } else {
      this.#yPos = yPos
    }
  }

  get image() {
    return this.#imageAsset.image
  }

  get isLoaded () {
    return this.#imageAsset.isLoaded
  }

  async waitForLoad () {
    await this.#imageAsset.waitForLoad()
  }

  get width () {
    return this.#width
  }

  get height () {
    return this.#height
  }

  get region () {
    return this.#region
  }

  set region (region) {
    this.#region = region
  }
}

