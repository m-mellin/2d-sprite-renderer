import { ImageAsset } from './ImageAsset.js'
import { SpriteRegion } from './SpriteRegion.js'

/**
 * Represents a sprite that can be rendered on a canvas.
 *
 * A sprite contains an image asset, its position and dimensions,
 * and can optionally use a region of its source image.
 */
export class Sprite {
  /**
   * The image asset used by the Sprite
   * 
   * @type {ImageAsset}
   * @private
   */
  #imageAsset
  
  /**
   * The X coordinate of the sprite in pixels.
   * 
   * @type {number}
   * @private
   */
  #x

  /**
   * The Y coordinate of the sprite in pixels.
   * 
   * @type {number}
   * @private
   */
  #y
  
  /**
   * The width of the sprite in pixels.
   * 
   * @type {number}
   * @private
   */
  #width

  /**
   * The height of the sprite in pixels.
   * 
   * @type {number}
   * @private
   */
  #height

  /**
   * The region of the source image to be used.
   * 
   * @type {SpriteRegion|null}
   * @private
   */
  #region

  /**
   * Creates an instance of the Sprite class.
   *
   * @param {string} src - The source of the image.
   * @param {object} [options] - The sprite options.
   * @param {number} [options.x=0] - The X coordinate in pixels.
   * @param {number} [options.y=0] - The Y coordinate in pixels.
   * @param {number} [options.width=0] - The width of the sprite in pixels.
   * @param {number} [options.height=0] - The height of the sprite in pixels.
   * @param {SpriteRegion|null} [options.region=null] - The region of the source image to use.
   */
  constructor (src, {x = 0, y = 0, width = 0, height = 0, region = null} = {}) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.region = region
    this.assignImageAsset(src)
  }

  /**
   * Sets the image asset for the sprite.
   * 
   * Uses an existing ImageAsset from the cache or creates a new one
   * if no asset exists for the given source.
   *
   * @param {string} src The source of the image.
   */
  assignImageAsset (src) {
    this.#imageAsset = ImageAsset.getAsset(src)
  }

  /**
   * Returns the X coordinate of the sprite.
   * 
   * @returns {number} The X coordinate in pixels.
   */
  get x () {
    return this.#x
  }

  /**
   * Sets the X coordinate of the sprite.
   * 
   * @param {number} x The X coordinate in pixels.
   */
  set x (x) {
    if (!Number.isFinite(x)) {
      throw new TypeError('x must be a finite number')
    }

    this.#x = x
  }

  /**
   * Returns the Y coordinate of the sprite.
   * 
   * @returns {number} The Y coordinate in pixels.
   */
  get y () {
    return this.#y
  }

  /**
   * Sets the Y coordinate of the sprite.
   * 
   * @param {number} y The Y coordinate in pixels.
   */
  set y (y) {
    if (!Number.isFinite(y)) {
      throw new TypeError('y must be a finite number')
    }

    this.#y = y
  }

  /**
   * Return the HTMLImageElement of the image asset.
   * 
   * @returns {HTMLImageElement} The image element
   */
  get image() {
    return this.#imageAsset.image
  }

  /**
   * Returns wether the image asset has finished loading.
   * 
   * @returns {boolean} true if the image has loaded, otherwise false.
   */
  get isLoaded () {
    return this.#imageAsset.isLoaded
  }

  /**
   * Waits for the image asset to finish loading.
   * 
   * @returns {Promise<void>} A promise that resolves when the image has loaded.
   */
  async waitForLoad () {
    await this.#imageAsset.waitForLoad()
  }

  /**
   * Returns the width of the sprite.
   * 
   * @returns {number} The width in pixels.
   */
  get width () {
    return this.#width
  }

  /**
   * Sets the width of the sprite.
   *
   * @param {number} width The width in pixels.
   */
  set width (width) {
    if (!Number.isFinite(width)) {
      throw new TypeError('width must be a finite number')
    }

    if (width < 0) {
      throw new RangeError('width can\'t be negative')
    }

    this.#width = width
  }

  /**
   * Returns the height of the sprite.
   * 
   * @returns {number} The height in pixels.
   */
  get height () {
    return this.#height
  }

  /**
   * Sets the height of the sprite.
   *
   * @param {number} height The height in pixels.
   */
  set height (height) {
    if (!Number.isFinite(height)) {
      throw new TypeError('height must be a finite number')
    }

    if (height < 0) {
      throw new RangeError('height can\'t be negative')
    }

    this.#height = height
  }

  /**
   * Returns the region of the source image used by the sprite.
   * 
   * @returns {SpriteRegion|null} The sprite region, or null if no region is set.
   */
  get region () {
    return this.#region
  }

  /**
   * Sets the region of the source image used by the sprite.
   *
   * @param {SpriteRegion|null} region The sprite region, or null to use the entire image.
   */
  set region (region) {
    if (region === null || region instanceof SpriteRegion) {
      this.#region = region
    } else {
      throw new TypeError('region must be null or of type SpriteRegion')
    }
  }
}

