/**
 * Represents an image asset that can be loaded and reused.
 *
 * Image assets are cached by their source to avoid loading the same image
 * multiple times.
 */
export class ImageAsset {
  /**
   * Stores loaded and loading image assets by their source.
   *
   * @type {Map<string, ImageAsset>}
   * @private
   */
  static #cache = new Map()

  /**
   * The image element used by the asset.
   *
   * @type {HTMLImageElement}
   * @private
   */
  #image = new Image()

  /**
   * Indicates whether the image has finished loading.
   *
   * @type {boolean}
   * @private
   */
  #isLoaded = false

  /**
   * Promise that resolves when the image has finished loading.
   *
   * @type {Promise<HTMLImageElement>}
   * @private
   */
  #loaded

  /**
   * Creates an image asset and starts loading the image.
   *
   * @param {string} src - Source of the image.
   */
  constructor (src) {
    this.#loaded = this.#createLoadPromise(src)
    this.#loaded.catch(() => {})
  }

  /**
   * Returns an existing image asset from the cache or creates a new one.
   *
   * @param {string} src - Source of the image.
   * @returns {ImageAsset} The image asset associated with the source.
   */
  static getAsset (src) {
    let asset = ImageAsset.#cache.get(src)

    if (!asset) {
      asset = this.#createAsset(src)
    }

    return asset
  }

  /**
   * Creates an image asset and adds it to the cache.
   *
   * @param {string} src - Source of the image.
   * @returns {ImageAsset} The newly created image asset.
   */
  static #createAsset (src) {
    const asset = new ImageAsset(src)
    ImageAsset.#cache.set(src, asset)

    return asset
  }

  /**
   * Starts loading the image and creates a promise for the result.
   *
   * @param {string} src - Source of the image.
   * @returns {Promise<HTMLImageElement>} A promise that resolves with the image when it has loaded.
   */
  #createLoadPromise (src) {
    return new Promise((resolve, reject) => {
      /**
       * Handles the image's load event.
       *
       * @returns {void}
       */
      this.#image.onload = () => this.#handleLoad(resolve)

      /**
       * Handles the image's error event.
       *
       * @param {Event} err - The error event dispatched by the image.
       * @returns {void}
       */
      this.#image.onerror = (err) => reject(err)

      this.#setImageSource(src)
    })
  }

  /**
   * Marks the asset as loaded and resolves the load promise.
   *
   * @param {(image: HTMLImageElement) => void} resolve - Resolves the load promise with the image.
   */
  #handleLoad (resolve) {
    this.#isLoaded = true
    resolve(this.#image)
  }

  /**
   * Sets the source of the image and starts loading it.
   *
   * @param {string} src - Source of the image.
   */
  #setImageSource (src) {
    this.#image.src = src
  }

  /**
   * Returns the image element.
   *
   * @returns {HTMLImageElement} The image element.
   */
  get image () {
    return this.#image
  }

  /**
   * Returns whether the image has finished loading.
   *
   * @returns {boolean} True if the image has loaded, otherwise false.
   */
  get isLoaded () {
    return this.#isLoaded
  }

  /**
   * Waits for the image to finish loading.
   *
   * @returns {Promise<void>} A promise that resolves when the image has loaded.
   */
  async waitForLoad() {
    await this.#loaded
  }
}