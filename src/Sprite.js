
export class Sprite {
  #image
  #xPos
  #yPos
  #loaded
  #width
  #height

  constructor (src, xPos = 0, yPos = 0, width, height) {
    this.#createImage()
    this.setPosition(xPos, yPos)
    this.#setSpriteSize(width, height)

    this.#loaded = new Promise((resolve, reject) => {
      this.#image.onload = resolve
      this.#image.onerror = reject
      this.setImageSource(src)
    })
  }

  #setSpriteSize (width, height) {
    this.#width = width
    this.#height = height
  }

  #createImage () {
    this.#image = new Image()
  }

  setImageSource (src) {
    this.#image.src = src
  }

  setPosition (xPos, yPos) {
    this.positionX = xPos
    this.positionY = yPos
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
    return this.#image
  }

  async waitForLoad () {
    await this.#loaded
  }

  get width () {
    return this.#width
  }

  get height () {
    return this.#height
  }
}

