import { describe, it, expect, vi } from 'vitest'

import { ImageAsset } from '../src/ImageAsset.js'
import { Sprite } from '../src/Sprite.js'
import { SpriteRegion } from '../src/SpriteRegion.js'
import { SpriteRenderer } from '../src/SpriteRenderer.js'
import { SpriteAnimation } from '../src/SpriteAnimation.js'

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
 * @param {Sprite} sprite 
 */
const simulateImageLoad = (sprite) => {
  sprite.image.dispatchEvent(new Event('load'))
}

let sourceCounter = 0

/**
 * Used to generate a unique string so that the sprites
 * in different test use a cached ImageAsset, already loaded.
 * 
 * @returns unique string
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

})