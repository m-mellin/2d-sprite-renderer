
export class Sprite {
  #image
  #xPos
  #yPos
  #loaded

  constructor (src, xPos = 0, yPos = 0) {
    this.#createImage()
    this.setPosition(xPos, yPos)

    this.#loaded = new Promise((resolve, reject) => {
      this.#image.onload = resolve
      this.#image.onerror = reject
      this.#setSrc(src)
    })
  }

  #createImage () {
    this.#image = new Image()
  }

  #setSrc (src) {
    this.#image.src = src
  }

  setPosition (xPos, yPos) {
    this.#positionX = xPos
    this.#positionY = yPos
  }

  get positionX () {
    return this.#xPos
  }

  set #positionX (xPos) {
    this.#xPos = xPos
  }

  get positionY () {
    return this.#yPos
  }

  set #positionY (yPos) {
    this.#yPos = yPos
  }

  get image() {
    return this.#image
  }

  async waitForLoad () {
    await this.#loaded
  }
}

