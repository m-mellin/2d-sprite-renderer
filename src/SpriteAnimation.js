/**
 * Defines an animation for a sprite.
 * 
 * Manages a sequence of sprite regions and changes the current frame
 * based on the elapsed time.
 */
export class SpriteAnimation {
  /**
   * The regions used as animation frames.
   * 
   * @type {SpriteRegion[]}
   * @private
   */
  #frames

  /**
   * The duration of each animation frame in miliseconds.
   * 
   * @type {number}
   * @private
   */
  #frameDuration

  /**
   * The index of the current animation frame.
   * 
   * @type {number}
   * @private
   */
  #currentFrame = 0

  /**
   * The time elapsed since the current frame started in miliseconds.
   * 
   * @type {number}
   * @private
   */
  #elapsedTime = 0

  /**
   * Creates a SpriteAnimation.
   * 
   * @param {SpriteRegion[]} frames - Regions used as animation frames. 
   * @param {number} frameDuration - Duration of each frame in miliseconds.
   */
  constructor (frames, frameDuration) {
    this.#frames = frames
    this.#frameDuration = frameDuration
  }

  /**
   * Updates the animation using the elapsed time.
   * 
   * @param {number} deltaTime - Time elapsed since the last update in miliseconds.
   */
  update (deltaTime) {
    this.#elapsedTime += deltaTime

    if (this.#elapsedTime >= this.#frameDuration) {
      this.#elapsedTime -= this.#frameDuration
      
      this.#currentFrame++

      this.#resetCurrentFrame()
    }
  }

  /**
   * Resets the current frame when the end of the animation is reached.
   * 
   * @private
   */
  #resetCurrentFrame () {
    if (this.#currentFrame >= this.#frames.length) {
      this.#currentFrame = 0
    }
  }

  /**
   * Returns the region of the current animation frame.
   * 
   * @returns {SpriteRegion} The current animation frame.
   */
  get region() {
    return this.#frames[this.#currentFrame]
  }
}