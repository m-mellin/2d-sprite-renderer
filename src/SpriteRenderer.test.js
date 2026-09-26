import { describe, it, expect, vi } from 'vitest'
import { SpriteRegion } from './SpriteRegion.js'
import { SpriteRenderer } from './SpriteRenderer.js'

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
 * Creates a mocked sprite-like object for use with SpriteRenderer, without
 * relying on a real Sprite or ImageAsset.
 *
 * @param {object} [overrides] - Properties to override on the default mocked sprite.
 * @returns {object} A mocked sprite with `isLoaded`, `image`, `x`, `y`, `width`, `height`, `region`, and a mocked `waitForLoad`.
 */
const createSprite = (overrides = {}) => ({
  isLoaded: true,
  image: {},
  x: 10,
  y: 20,
  width: 32,
  height: 32,
  region: null,
  waitForLoad: vi.fn(() => Promise.resolve()),
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
    it('adds a loaded sprite to the renderer', () => {
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

    it('waits for an unloaded sprite before rendering', () => {
      const { canvas } = createCanvas()
      const renderer = new SpriteRenderer(canvas)

      const sprite = createSprite({
        isLoaded: false
      })

      renderer.add(sprite)

      expect(sprite.waitForLoad).toHaveBeenCalled()
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

    it('does not render an unloaded sprite', () => {
      const { canvas, context } = createCanvas()
      const renderer = new SpriteRenderer(canvas)
      const sprite = createSprite({
        isLoaded: false
      })

      renderer.add(sprite)
      renderer.render()

      expect(context.drawImage).not.toHaveBeenCalled()
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