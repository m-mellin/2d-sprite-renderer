import { describe, it, expect, vi } from 'vitest'

import { ImageAsset } from '../src/ImageAsset.js'
import { Sprite } from '../src/Sprite.js'
import { SpriteRegion } from '../src/SpriteRegion.js'
import { SpriteRenderer } from '../src/SpriteRenderer.js'
import { SpriteAnimation } from '../src/SpriteAnimation.js'

/**
 * Creates a canvas with a mocked 2D context, for use in tests.
 *
 * @returns {{canvas: HTMLCanvasElement, context: object}} The canvas and its mocked context.
 */
const createCanvas = () => {
  const context = {
    clearRect: vi.fn(),
    drawImage: vi.fn()
  }

  const canvas = document.createElement('canvas')
  canvas.width = 1920
  canvas.height = 1080
  canvas.getContext = vi.fn(() => context)

  return { canvas, context }
}

/**
 * Simulates the browser finishing loading an image.
 * This is needed because of the limitations of JSDOM.
 * 
 * @param {Sprite} sprite - The sprite which image should be marked as loaded.
 */
const simulateImageLoad = (sprite) => {
  sprite.image.dispatchEvent(new Event('load'))
}

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


describe('Integration', () => {
  describe('Sprite + ImageAsset', () => {
    it('reflects the real loading of the image', async () => {
      const sprite = new Sprite(createUniqueSource())

      expect(sprite.isLoaded).toBe(false)

      const loaded = sprite.waitForLoad()
      simulateImageLoad(sprite)
      await loaded

      expect(sprite.isLoaded).toBe(true)
    })

    it('assignImageAsset swaps the image and resets the loading state', () => {
      const sprite = new Sprite(createUniqueSource())

      sprite.assignImageAsset(createUniqueSource())

      expect(sprite.image).toBeInstanceOf(HTMLImageElement)
      expect(sprite.isLoaded).toBe(false)
    })
  })

  describe('Sprite + SpriteRegion + SpriteRenderer', () => {
    it('renders a real loaded Sprite using its whole image', async () => {
      const { canvas, context } = createCanvas()
      const renderer = new SpriteRenderer(canvas)

      const sprite = new Sprite(createUniqueSource(), {x: 10, y: 10, width: 64, height: 64})
      
      expect(sprite.isLoaded).toBe(false)

      const loaded = sprite.waitForLoad()
      simulateImageLoad(sprite)
      await loaded
      
      expect(sprite.isLoaded).toBe(true)

      renderer.add(sprite)
      renderer.render()

      expect(context.drawImage).toHaveBeenCalledWith(
        sprite.image,
        sprite.x,
        sprite.y,
        sprite.width,
        sprite.height
      )
    })
    
    it('renders a real loaded Sprite using a real SpriteRegion', async () => {
      const { canvas, context } = createCanvas()
      const renderer = new SpriteRenderer(canvas)

      const region = new SpriteRegion({x: 0, y: 0, width: 64, height: 64})

      const sprite = new Sprite(createUniqueSource(), {x: 10, y: 10, width: 64, height: 64, region})
      
      expect(sprite.isLoaded).toBe(false)

      const loaded = sprite.waitForLoad()
      simulateImageLoad(sprite)
      await loaded
      
      expect(sprite.isLoaded).toBe(true)

      renderer.add(sprite)
      renderer.render()

      expect(context.drawImage).toHaveBeenCalledWith(
        sprite.image,
        region.x,
        region.y,
        region.width,
        region.height,
        sprite.x,
        sprite.y,
        sprite.width,
        sprite.height
      )
    })
  })

  describe('Sprite + SpriteAnimation + SpriteRenderer + SpriteRegion', () => {
    it('draws the frame matching the animation', async () => {
      const { canvas, context } = createCanvas()

      const renderer = new SpriteRenderer(canvas)
      const sprite = new Sprite(createUniqueSource(), {x: 10, y: 10, width: 64, height: 64})

      const frame1 = new SpriteRegion({ x: 0, y: 0, width: 64, height: 64 })
      const frame2 = new SpriteRegion({ x: 64, y: 0, width: 64, height: 64 })

      const animation = new SpriteAnimation([frame1, frame2], 100)

      const loaded = sprite.waitForLoad()
      simulateImageLoad(sprite)
      await loaded

      expect(sprite.isLoaded).toBe(true)

      renderer.add(sprite)

      animation.update(60)
      sprite.region = animation.region
      renderer.render()

      expect(context.drawImage).toHaveBeenCalledWith(
        sprite.image,
        frame1.x,
        frame1.y,
        frame1.width,
        frame1.height,
        sprite.x,
        sprite.y,
        sprite.width,
        sprite.height
      )

      animation.update(60)
      sprite.region = animation.region
      renderer.render()

      expect(context.drawImage).toHaveBeenCalledWith(
        sprite.image,
        frame2.x,
        frame2.y,
        frame2.width,
        frame2.height,
        sprite.x,
        sprite.y,
        sprite.width,
        sprite.height
      )
    })
  })
})