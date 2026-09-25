import { describe, it, expect, vi } from 'vitest'
import { Sprite } from './Sprite.js'
import { SpriteRegion } from './SpriteRegion.js'
import { SpriteRenderer } from './SpriteRenderer.js'

const src = '../src/mario.bmp'

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

describe('SpriteRenderer', () => {
  describe('constructor', () => {
    it('creates a SpriteRenderer', () => {
      const { canvas } = createCanvas()

      const renderer = new SpriteRenderer(canvas)

      expect(renderer).toBeInstanceOf(SpriteRenderer)
    })

    it('gets the 2D rendering context from the canvas', () => {
      const { canvas } = createCanvas()

      new SpriteRenderer(canvas)

      expect(canvas.getContext).toHaveBeenCalledWith('2d')
    })
  })

  describe('add', () => {
    it('adds a loaded sprite to the renderer', () => {
      const { canvas, context } = createCanvas()
      const renderer = new SpriteRenderer(canvas)
      const sprite = {
        isLoaded: true,
        image: {},
        x: 10,
        y: 20,
        width: 32,
        height: 32,
        region: null
      }

      renderer.add(sprite)
      renderer.render()

      expect(context.drawImage).toHaveBeenCalled(
        sprite.image,
        sprite.x,
        sprite.y,
        sprite.width,
        sprite.height,
        sprite.region
      )
    })
  })

  describe('remove', () => {
    it('removes a sprite from the renderer', () => {
      const { canvas, context } = createCanvas()
      const renderer = new SpriteRenderer(canvas)
      const sprite = {
        isLoaded: true,
        image: {},
        x: 10,
        y: 20,
        width: 32,
        height: 32,
        region: null
      }

      renderer.add(sprite)
      renderer.remove(sprite)
      renderer.render()

      expect(context.drawImage).not.toHaveBeenCalled(
        sprite.image,
        sprite.x,
        sprite.y,
        sprite.width,
        sprite.height,
        sprite.region
      )
    })
  })
})