import { ImageAsset } from './ImageAsset.js'

export class Sprite {
  #imageAsset
  #xPos
  #yPos
  #width
  #height
  #region

  constructor (src, xPos = 0, yPos = 0, width, height, region = null) {
    this.#xPos = xPos
    this.#yPos = yPos
    this.#setSpriteSize(width, height)
    this.setImageSource(src)
    this.#region = region
  }

  #setSpriteSize (width, height) {
    this.#width = width
    this.#height = height
  }

  setImageSource (src) {
    this.#imageAsset = ImageAsset.get(src)
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
}

