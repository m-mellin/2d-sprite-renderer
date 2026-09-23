import { ImageAsset } from './ImageAsset.js'

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
  #xPos

  /**
   * The Y coordinate of the sprite in pixels.
   * 
   * @type {number}
   * @private
   */
  #yPos
  
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
   * @param {string} src The source of the image.
   * @param {number} xPos The X coordinate in pixels (default: 0).
   * @param {number} yPos The Y coordinate in pixels (default: 0).
   * @param {number} width The width of the sprite in pixels.
   * @param {number} height The height of the sprite in pixels.
   * @param {SpriteRegion|null} region The region of the source image to use (default: null).
   */
  constructor (src, xPos = 0, yPos = 0, width, height, region = null) {
    this.positionX = xPos
    this.positionY = yPos
    this.#width = width
    this.#height = height
    this.setImageSource(src)
    this.#region = region
  }

  /**
   * Sets the image asset for the sprite.
   * Uses an existing ImageAsset from the cache or creates a new one
   * if no asset exists for the given source.
   *
   * @param {string} src The source of the image.
   */
  setImageSource (src) {
    this.#imageAsset = ImageAsset.getAsset(src)
  }

  /**
   * Returns the X coordinate of the sprite.
   * 
   * @returns {number} The X coordinate in pixels.
   */
  get positionX () {
    return this.#xPos
  }

  /**
   * Sets the X coordinate of the Sprite
   * 
   * @param {number} xPos The X coordinate in pixels.
   */
  set positionX (xPos) {
    if (typeof xPos !== 'number') {
      throw new TypeError('xPos must be a number')
    } else {
      this.#xPos = xPos
    }
  }

  /**
   * Returns the Y coordinate of the sprite.
   * 
   * @returns {number} The Y coordinate in pixels.
   */
  get positionY () {
    return this.#yPos
  }

  /**
   * Sets the Y coordinate of the Sprite
   * 
   * @param {number} yPos The Y coordinate in pixels.
   */
  set positionY (yPos) {
    if (typeof yPos !== 'number') {
      throw new TypeError('yPos must be a number')
    } else {
      this.#yPos = yPos
    }
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
   * Returns the height of the sprite.
   * 
   * @returns {number} The height in pixels.
   */
  get height () {
    return this.#height
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
    this.#region = region
  }
}

