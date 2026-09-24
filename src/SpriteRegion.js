/**
 * Defines a rectangular region of a sprite's source image.
 * 
 * Contains the position and dimensions of the regiond to render.
 */
export class SpriteRegion {
  /**
   * The X coordinate of the region in pixels.
   * 
   * @type {number}
   * @private
   */
  #x

  /**
   * The Y coordinate of the region in pixels.
   * 
   * @type {number}
   * @private
   */
  #y

  /**
   * The width of the region in pixels.
   * 
   * @type {number}
   * @private
   */
  #width

  /**
   * The height of the region in pixels.
   * 
   * @type {number}
   * @private
   */
  #height

  /**
   * Creates a SpriteRegion.
   *
   * @param {number} x - X coordinate of the region in the source image.
   * @param {number} y - Y coordinate of the region in the source image.
   * @param {number} width - Width of the region.
   * @param {number} height - Height of the region.
   */
  constructor (x, y, width, height) {
    this.#x = x
    this.#y = y
    this.#width = width
    this.#height = height
  }

  /**
   * Returns the X coordinate of the SpriteRegion.
   * 
   * @returns {number} The X coordinate in pixels.
   */
  get x () {
    return this.#x
  }

  /**
   * Sets the X coordinate of the SpriteRegion.
   * 
   * @param {number} x The X coordinate in pixels.
   */
  set x (x) {
    if (!Number.isFinite(x)) {
      throw new TypeError('x must be a finite number')
    }

    if (x < 0) {
      throw new RangeError('x can\'t be negative')
    }

    this.#x = x
  }

  /**
   * Returns the Y coordinate of the SpriteRegion.
   * 
   * @returns {number} The Y coordinate in pixels.
   */
  get y () {
    return this.#y
  }

  /**
   * Sets the Y coordinate of the SpriteRegion.
   * 
   * @param {number} y The Y coordinate in pixels.
   */
  set y (y) {
    if (!Number.isFinite(y)) {
      throw new TypeError('y must be a finite number')
    }

    if (y < 0) {
      throw new RangeError('y can\'t be negative')
    }

    this.#y = y
  }

  /**
   * Returns the width of the region.
   * 
   * @returns {number} The width in pixels.
   */
  get width () {
    if (!Number.isFinite(width)) {
      throw new TypeError('width must be a finite number')
    }

    if (width < 0) {
      throw new RangeError('width can\'t be negative')
    }

    this.#width = width
  }

  /**
   * Returns the height of the region.
   * 
   * @returns {number} The height in pixels.
   */
  get height () {
    if (!Number.isFinite(height)) {
      throw new TypeError('height must be a finite number')
    }

    if (height < 0) {
      throw new RangeError('height can\'t be negative')
    }

    this.#height = height
  }
}