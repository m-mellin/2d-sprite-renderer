import { describe, it, expect } from 'vitest'
import { ImageAsset } from './ImageAsset.js'

describe('ImageAsset', () => {
  describe('constructor', () => {
    it('creates an ImageAsset with isLoaded initally false', () => {
      const asset = new ImageAsset('test-image-png')

      expect(asset.isLoaded).toBe(false)
    })

    it('sets the image source to assigned source', () => {
      const asset = new ImageAsset('test-image.png')

      expect(asset.image.src).toContain('test-image.png')
    })

    it('exposes and HTMLImageElement via image getter', () => {
      const asset = new ImageAsset('test-image.png')

      expect(asset.image).toBeInstanceOf(HTMLImageElement)
    })

    it('creates a new instance, even with the same src', () => {
      const assetOne = new ImageAsset('test-image.png')
      const assetTwo = new ImageAsset('test-image.png')

      expect(assetOne).not.toBe(assetTwo)
    })
  })

  describe('Loading', () => {
    it('sets isLoaded to true when image is loaded', () => {
      const asset = new ImageAsset('test-image.png')

      asset.image.dispatchEvent(new Event('load'))

      expect(asset.isLoaded).toBe(true)
    })

    it('waitForLoad() resolves once the image has loaded', async () => {
      const asset = new ImageAsset('test-image.png')

      const pending = asset.waitForLoad()
      asset.image.dispatchEvent(new Event('load'))

      await expect(pending).resolves.toBeUndefined()
    })

    it('waitForLoad() rejects if the image fails to load', async () => {
      const asset = new ImageAsset('test-image.png')

      const pending = asset.waitForLoad()
      asset.image.dispatchEvent(new Event('error'))

      await expect(pending).rejects.toBeDefined()
    })

    it('isLoaded remnains false if the image fails to load', async () => {
      const asset = new ImageAsset('test-image.png')

      const pending = asset.waitForLoad()
      asset.image.dispatchEvent(new Event('error'))

      await pending.catch(() => {})

      expect(asset.isLoaded).toBe(false)
    })
  })

  describe('getAsset', () => {
    it('returns the same instance for the same source', () => {
      new ImageAsset('test-image-one.png')

      const assetOne = ImageAsset.getAsset('test-image-one.png')
      const assetTwo = ImageAsset.getAsset('test-image-one.png')

      expect(assetOne).toBe(assetTwo)
    })

    it('returns different instances for different source', () => {
      new ImageAsset('test-image-one.png')
      new ImageAsset('test-image-two.png')

      const assetOne = ImageAsset.getAsset('test-image-one.png')
      const assetTwo = ImageAsset.getAsset('test-image-two.png')

      expect(assetOne).not.toBe(assetTwo)
    })
  })
})