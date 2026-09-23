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
  #sourceX

  /**
   * The Y coordinate of the region in pixels.
   * 
   * @type {number}
   * @private
   */
  #sourceY

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
   * @param {number} sourceX - X coordinate of the region in the source image.
   * @param {number} sourceY - Y coordinate of the region in the source image.
   * @param {number} width - Width of the region.
   * @param {number} height - Height of the region.
   */
  constructor (sourceX, sourceY, width, height) {
    this.#sourceX = sourceX
    this.#sourceY = sourceY
    this.#width = width
    this.#height = height
  }

  /**
   * Returns the X coordinate of the region.
   * 
   * @returns {number} The X coordinate in pixels.
   */
  get sourceX () {
    return this.#sourceX
  }

  /**
   * Returns the Y coordinate of the region.
   * 
   * @returns {number} The Y coordinate in pixels.
   */
  get sourceY () {
    return this.#sourceY
  }

  /**
   * Returns the width of the region.
   * 
   * @returns {number} The width in pixels.
   */
  get width () {
    return this.#width
  }

  /**
   * Returns the height of the region.
   * 
   * @returns {number} The height in pixels.
   */
  get height () {
    return this.#height
  }
}