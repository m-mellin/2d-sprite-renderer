import { describe, it, expect, vi } from 'vitest'
import { SpriteRegion } from './SpriteRegion.js'
import { SpriteRenderer } from './SpriteRenderer.js'

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

const createSprite = (overrides = {}) => ({
  isLoaded: true,
  image: {},
  x: 10,
  y: 20,
  width: 32,
  height: 32,
  region: null,
  ...overrides
})

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
    it('adds a sprite to the renderer', () => {
      const { canvas, context } = createCanvas()
      const renderer = new SpriteRenderer(canvas)
      const sprite = createSprite()

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
  })

  describe('remove', () => {
    it('removes a sprite from the renderer', () => {
      const { canvas, context } = createCanvas()
      const renderer = new SpriteRenderer(canvas)
      const sprite = createSprite()

      renderer.add(sprite)
      renderer.remove(sprite)
      renderer.render()

      expect(context.drawImage).not.toHaveBeenCalled()
    })

    it('does nothing when the sprite is not in the renderer', () => {
      const { canvas, context } = createCanvas()
      const renderer = new SpriteRenderer(canvas)
      const sprite = createSprite()

      renderer.remove(sprite)
      renderer.render()

      expect(context.drawImage).not.toHaveBeenCalled()
    })
  })

  describe('clear', () => {
    it('removes all sprites and clears the canvas', () => {
      const { canvas, context } = createCanvas()
      const renderer = new SpriteRenderer(canvas)
      const sprite = createSprite()

      renderer.add(sprite)
      renderer.clear()

      expect(context.clearRect).toHaveBeenCalledWith(
        0,
        0,
        canvas.width,
        canvas.height
      )

      renderer.render()

      expect(context.drawImage).not.toHaveBeenCalled()
    })
  })

  describe('render', () => {
    it('clears the canvas before rendering sprites', () => {
      const { canvas, context } = createCanvas()
      const renderer = new SpriteRenderer(canvas)

      renderer.render()

      expect(context.clearRect).toHaveBeenCalledWith(
        0,
        0,
        canvas.width,
        canvas.height
      )
    })

    it('renders a sprite using its whole image', () => {
      const { canvas, context } = createCanvas()
      const renderer = new SpriteRenderer(canvas)
      const sprite = createSprite()

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

    it('renders a sprite using its image region', () => {
      const { canvas, context } = createCanvas()
      const renderer = new SpriteRenderer(canvas)
      const region = new SpriteRegion(0, 0, 16, 16)
      const sprite = createSprite({ region })

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