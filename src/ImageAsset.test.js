import { describe, it, expect } from 'vitest'
import { ImageAsset } from './ImageAsset.js'

let sourceCounter = 0

/**
 * Creates a unique image source, so that sprites in different tests
 * don't accidentally share the same cached ImageAsset.
 *
 * @returns {string} A unique image source.
 */
const createUniqueSource = () => {
  return `/dir/image-${++sourceCounter}.png`
}

describe('ImageAsset', () => {
  describe('constructor', () => {
    it('creates an ImageAsset with isLoaded initally false', () => {
      const asset = new ImageAsset(createUniqueSource())

      expect(asset.isLoaded).toBe(false)
    })

    it('sets the image source to assigned source', () => {
      const src = createUniqueSource()
      const asset = new ImageAsset(src)

      expect(asset.image.src).toContain(src)
    })

    it('exposes and HTMLImageElement via image getter', () => {
      const asset = new ImageAsset(createUniqueSource())

      expect(asset.image).toBeInstanceOf(HTMLImageElement)
    })

    it('creates a new instance, even with the same src', () => {
      const src = createUniqueSource()
      const assetOne = new ImageAsset(src)
      const assetTwo = new ImageAsset(src)

      expect(assetOne).not.toBe(assetTwo)
    })
  })

  describe('Loading', () => {
    it('sets isLoaded to true when image is loaded', () => {
      const asset = new ImageAsset(createUniqueSource())

      asset.image.dispatchEvent(new Event('load'))

      expect(asset.isLoaded).toBe(true)
    })

    it('waitForLoad() resolves once the image has loaded', async () => {
      const asset = new ImageAsset(createUniqueSource())

      const pending = asset.waitForLoad()
      asset.image.dispatchEvent(new Event('load'))

      await expect(pending).resolves.toBeUndefined()
    })

    it('waitForLoad() rejects if the image fails to load', async () => {
      const asset = new ImageAsset(createUniqueSource())

      const pending = asset.waitForLoad()
      asset.image.dispatchEvent(new Event('error'))

      await expect(pending).rejects.toBeDefined()
    })

    it('isLoaded remains false if the image fails to load', async () => {
      const asset = new ImageAsset(createUniqueSource())

      const pending = asset.waitForLoad()
      asset.image.dispatchEvent(new Event('error'))

      await pending.catch(() => {})

      expect(asset.isLoaded).toBe(false)
    })
  })

  describe('getAsset', () => {
    it('returns the same instance for the same source', () => {
      const src = createUniqueSource()
      new ImageAsset(src)

      const assetOne = ImageAsset.getAsset(src)
      const assetTwo = ImageAsset.getAsset(src)

      expect(assetOne).toBe(assetTwo)
    })

    it('returns different instances for different source', () => {
      const src1 = createUniqueSource()
      const src2 = createUniqueSource()
      new ImageAsset(src1)
      new ImageAsset(src2)

      const assetOne = ImageAsset.getAsset(src1)
      const assetTwo = ImageAsset.getAsset(src2)

      expect(assetOne).not.toBe(assetTwo)
    })
  })
})