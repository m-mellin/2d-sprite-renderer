import { describe, it, expect, beforeEach, vi } from 'vitest'

/**
 * JSDOM has no real canvas, so measuring text is mocked before TextSprite is imported.
 * 
 * Every character is as wide as the font size, and the text is as tall as the font size.
 */
vi.hoisted(() => {
  HTMLCanvasElement.prototype.getContext = () => ({
    font: '',
    measureText(text) {
      const fontSize = parseInt(this.font)

      return {
        width: text.length * fontSize,
        fontBoundingBoxAscent: fontSize * 0.75,
        fontBoundingBoxDescent: fontSize * 0.25
      }
    }
  })
})

import { TextSprite } from './TextSprite.js'

describe('TextSprite', () => {
  describe('constructor', () => {
    it('creates a TextSprite with default values', () => {
      const sprite = new TextSprite('test')

      expect(sprite.text).toBe('test')
      expect(sprite.x).toBe(0)
      expect(sprite.y).toBe(0)
      expect(sprite.color).toBe('rgba(0, 0, 0, 1)')
      expect(sprite.font).toBe('16px sans-serif')
    })

    it('creates a TextSprite with specified position', () => {
      const sprite = new TextSprite('test', { x: 20, y: 40 })

      expect(sprite.x).toBe(20)
      expect(sprite.y).toBe(40)
    })

    it('creates a TextSprite with specified font', () => {
      const sprite = new TextSprite('test', { font: '20px sans-serif' })

      expect(sprite.font).toBe('20px sans-serif')
    })

    it('creates a TextSprite with specified color', () => {
      const sprite = new TextSprite('test', { color: '#fff' })

      expect(sprite.color).toBe('#fff')
    })
  })

  describe('Position', () => {
    let sprite

    beforeEach(() => {
      sprite = new TextSprite('test', { x: 20, y: 20 })
    })

    it('get x returns correct position', () => {
      expect(sprite.x).toBe(20)
    })

    it('get y returns correct position', () => {
      expect(sprite.y).toBe(20)
    })

    it('set x assigns correct position', () => {
      sprite.x = 44
      expect(sprite.x).toBe(44)
    })

    it('set y assigns correct position', () => {
      sprite.y = 255
      expect(sprite.y).toBe(255)
    })
  })

  describe('Size', () => {
    let sprite

    beforeEach(() => {
      sprite = new TextSprite('test', { font: '10px sans-serif' })
    })

    it('knows its width as soon as it is created', () => {
      expect(sprite.width).toBe(40)
    })

    it('knows its height as soon as it is created', () => {
      expect(sprite.height).toBe(10)
    })

    it('measures again when the text changes', () => {
      sprite.text = 'longer text'

      expect(sprite.width).toBe(110)
    })

    it('measures again when the font changes', () => {
      sprite.font = '20px sans-serif'

      expect(sprite.width).toBe(80)
      expect(sprite.height).toBe(20)
    })

    it('has no width for an empty text', () => {
      sprite.text = ''

      expect(sprite.width).toBe(0)
    })

    it('cannot have its width set from outside', () => {
      expect(() => {
        sprite.width = 500
      }).toThrow(TypeError)
    })

    it('cannot have its height set from outside', () => {
      expect(() => {
        sprite.height = 500
      }).toThrow(TypeError)
    })
  })

  describe('Validation', () => {
    let sprite

    beforeEach(() => {
      sprite = new TextSprite('test')
    })

    it.each([42, null, undefined])(
      'throws a TypeError when the text is %s',
      (text) => {
        expect(() => new TextSprite(text)).toThrow(TypeError)
      }
    )

    it.each([NaN, Infinity, '10'])('throws a TypeError when x is %s', (x) => {
      expect(() => {
        sprite.x = x
      }).toThrow(TypeError)
    })

    it.each([NaN, Infinity, '10'])('throws a TypeError when y is %s', (y) => {
      expect(() => {
        sprite.y = y
      }).toThrow(TypeError)
    })

    it.each([16, null])('throws a TypeError when the font is %s', (font) => {
      expect(() => {
        sprite.font = font
      }).toThrow(TypeError)
    })

    it.each([0, null])('throws a TypeError when the color is %s', (color) => {
      expect(() => {
        sprite.color = color
      }).toThrow(TypeError)
    })

    it('allows zero as position', () => {
      sprite.x = 0
      sprite.y = 0

      expect(sprite.x).toBe(0)
      expect(sprite.y).toBe(0)
    })

    it('allows position to be negative', () => {
      sprite.x = -10
      sprite.y = -5
      expect(sprite.x).toBe(-10)
      expect(sprite.y).toBe(-5)
    })
  })

  describe('isLoaded', () => {
    it('is always ready to draw, since text needs no image', () => {
      expect(new TextSprite('test').isLoaded).toBe(true)
    })
  })
})
