export class SpriteAnimation {
  #frames
  #frameDuration
  #currentFrame = 0
  #elapsedTime = 0

  constructor (frames, frameDuration) {
    this.#frames = frames
    this.#frameDuration = frameDuration
  }

  update (deltaTime) {
    this.#elapsedTime += deltaTime

    if (this.#elapsedTime >= this.#frameDuration) {
      this.#elapsedTime -= this.#frameDuration
      
      this.#currentFrame++

      this.#resetCurrentFrame()
    }
  }

  #resetCurrentFrame () {
    if (this.#currentFrame >= this.#frames.length) {
      this.#currentFrame = 0
    }
  }

  get region() {
    return this.#frames[this.#currentFrame]
  }
}