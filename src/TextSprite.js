/**
 * Represents a piece of text that can be rendered on a canvas.
 */
export class TextSprite {
  /**
   * The text to draw.
   *
   * @type {string}
   * @private
   */
  #text

  /**
   * The X coordinate of the text in pixels.
   *
   * @type {number}
   * @private
   */
  #x

  /**
   * The Y coordinate of the top of the text in pixels.
   *
   * @type {number}
   * @private
   */
  #y

  /**
   * The width of the text, in pixels.
   *
   * @type {number}
   */
  #width = 0

  /**
   * The height of the text, in pixels.
   *
   * @type {number}
   */
  #height = 0

  /**
   * The CSS font used to draw the text, for example "16px sans-serif".
   *
   * @type {string}
   * @private
   */
  #font

  /**
   * The CSS color used to draw the text, for example "#000000"
   *
   * @type {string}
   * @private
   */
  #color

  /**
   * A canvas context shared by every text line, used only for measuring text.
   *
   * @type {CanvasRenderingContext2D | null}
   */
  static #context = document.createElement('canvas').getContext('2d')

  /**
   * Creates a TextSprite.
   *
   * @param {string} text - The text to draw.
   * @param {object} [options] - The text options.
   * @param {number} [options.x=0] - The X coordinate in pixels.
   * @param {number} [options.y=0] - The Y coordinate of the top of the text in pixels.
   * @param {string} [options.font="16px sans-serif"] - The CSS font.
   * @param {string} [options.color="rbgba(0, 0, 0, 1)"] - The CSS color.
   */
  constructor(
    text,
    { x = 0, y = 0, font = '16px sans-serif', color = 'rgba(0, 0, 0, 1)' } = {}
  ) {
    this.text = text
    this.x = x
    this.y = y
    this.font = font
    this.color = color
  }

  /**
   * Returns the text.
   *
   * @returns {string} The text to draw.
   */
  get text() {
    return this.#text
  }

  /**
   * Sets the text.
   *
   * @param {string} text The text to draw.
   * @throws {TypeError} If text is not a sprite.
   */
  set text(text) {
    if (typeof text !== 'string') {
      throw new TypeError('text must be a string')
    }

    this.#text = text
    this.#measureTextAndSetSize()
  }

  /**
   * Returns the X coordinate of the text.
   *
   * @returns {number} The X coordinate in pixels.
   */
  get x() {
    return this.#x
  }

  /**
   * Sets the X coordinate of the text.
   *
   * @param {number} x The X coordinate in pixels.
   * @throws {TypeError} If x is not finite.
   */
  set x(x) {
    if (!Number.isFinite(x)) {
      throw new TypeError('x must be a finite number')
    }

    this.#x = x
  }

  /**
   * Returns the Y coordinate of the text.
   *
   * @returns {number} The Y coordinate in pixels.
   */
  get y() {
    return this.#y
  }

  /**
   * Sets the Y coordinate of the text.
   *
   * @param {number} y The Y coordinate in pixels.
   * @throws {TypeError} If y is not finite.
   */
  set y(y) {
    if (!Number.isFinite(y)) {
      throw new TypeError('y must be a finite number')
    }

    this.#y = y
  }

  /**
   * Returns the width of the text.
   *
   * @returns {number} The width in pixels.
   */
  get width() {
    return this.#width
  }

  /**
   * Returns the height of the text.
   *
   * @returns {number} The height in pixels.
   */
  get height() {
    return this.#height
  }

  /**
   * Returns the CSS font of the text.
   *
   * @returns {string} The CSS font.
   */
  get font() {
    return this.#font
  }

  /**
   * Sets the CSS font of the text.
   *
   * @param {string} font The CSS font, for example "16px monospace".
   * @throws {TypeError} If font is not a string.
   */
  set font(font) {
    if (typeof font !== 'string') {
      throw new TypeError('font must be a string')
    }

    this.#font = font
    this.#measureTextAndSetSize()
  }

  /**
   * Returns the CSS color of the text.
   *
   * @returns {string} The CSS color.
   */
  get color() {
    return this.#color
  }

  /**
   * Sets the CSS color of the text.
   *
   * @param {string} color The CSS color.
   * @throws {TypeError} If color is not a string.
   */
  set color(color) {
    if (typeof color !== 'string') {
      throw new TypeError('color must be a string')
    }

    this.#color = color
  }

  /**
   * Returns whether the text is ready to draw. Text needs no image, so it always is.
   *
   * @returns {boolean} Always true.
   */
  get isLoaded() {
    return true
  }

  /**
   * Measures the text with the sprite's font and stores its width and height.
   *
   * @throws {Error} If the browser cannot create a context for measuring text.
   */
  #measureTextAndSetSize() {
    const context = TextSprite.#context

    if (context === null) {
      throw new Error('Could not create a 2D context for measuring text')
    }

    context.font = this.#font
    const metrics = context.measureText(this.#text)

    this.#width = Math.ceil(metrics.width)
    this.#height = Math.ceil(
      metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
    )
  }
}
