export class BlockSprite {
  #x
  #y
  #width
  #height
  #color
  #opacity

  constructor(width = 0, height = 0, {x = 0, y = 0, color = '#000', opacity = 1} = {}) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.opacity = opacity
  }

  /**
   * Returns the X coordinate of the block.
   *
   * @returns {number} The X coordinate in pixels.
   */
  get x() {
    return this.#x;
  }

  /**
   * Sets the X coordinate of the block.
   *
   * @param {number} x The X coordinate in pixels.
   */
  set x(x) {
    if (!Number.isFinite(x)) {
      throw new TypeError("x must be a finite number");
    }

    this.#x = x;
  }

  /**
   * Returns the Y coordinate of the block.
   *
   * @returns {number} The Y coordinate in pixels.
   */
  get y() {
    return this.#y;
  }

  /**
   * Sets the Y coordinate of the block.
   *
   * @param {number} y The Y coordinate in pixels.
   */
  set y(y) {
    if (!Number.isFinite(y)) {
      throw new TypeError("y must be a finite number");
    }

    this.#y = y;
  }

  /**
   * Returns the width of the block.
   *
   * @returns {number} The width in pixels.
   */
  get width() {
    return this.#width;
  }

  /**
   * Sets the width of the block.
   *
   * @param {number} width The width in pixels.
   */
  set width(width) {
    if (!Number.isFinite(width)) {
      throw new TypeError("width must be a finite number");
    }

    this.#width = width;
  }

  /**
   * Returns the height of the block.
   *
   * @returns {number} The height in pixels.
   */
  get height() {
    return this.#height;
  }

  /**
   * Sets the height coordinate of the block.
   *
   * @param {number} height The height in pixels.
   */
  set height(height) {
    if (!Number.isFinite(height)) {
      throw new TypeError("height must be a finite number");
    }

    this.#height = height;
  }

  /**
   * Returns the CSS color of the block.
   *
   * @returns {string} The CSS color.
   */
  get color() {
    return this.#color;
  }

  /**
   * Sets the CSS color of the block.
   *
   * @param {string} color The CSS color.
   */
  set color(color) {
    if (typeof color !== "string") {
      throw new TypeError("color must be a string");
    }

    this.#color = color;
  }

  get opacity() {
    return this.#opacity
  }

  set opacity(value) {
    if (!Number.isFinite(value)) {
      throw new TypeError("opacity must be a finite number");
    }

    if (value > 1 || value < 0) {
      throw new RangeError("opacity must be between 0 and 1")
    }

    this.#opacity = value
  }

  /**
   * Returns whether the block is ready to draw. A block needs no image, so it always is.
   *
   * @returns {boolean} Always true.
   */
  get isLoaded() {
    return true
  }
}