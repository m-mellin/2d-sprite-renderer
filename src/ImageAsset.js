export class ImageAsset {
  static #cache = new Map()
  #image
  #isLoaded = false
  #loaded

  constructor (src) {
    this.#image = new Image()
    this.#loaded = this.#createLoadPromise(src)
    this.#loaded.catch(() => {})
  }

  static get (src) {
    let asset = ImageAsset.#cache.get(src)

    if (!asset) {
      asset = new ImageAsset(src)
      ImageAsset.#cache.set(src, asset)
    }

    return asset
  }

  #createLoadPromise (src) {
    return new Promise((resolve, reject) => {
      this.#image.onload = () => {
        this.#isLoaded = true
        resolve(this.#image)
      }

      this.#image.onerror = (err) => reject(err)

      this.#setImageSource(src)
    })
  }

  #setImageSource (src) {
    this.#image.src = src
  }

  get image () {
    return this.#image
  }

  get isLoaded () {
    return this.#isLoaded
  }

  async waitForLoad() {
    await this.#loaded
  }
}