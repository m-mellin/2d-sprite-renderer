import { describe, it, expect } from 'vitest'
import { SpriteRegion } from './SpriteRegion.js'

describe('SpriteRegion', () => {
  describe('constructor', () => {
    it('creates a SpriteRegion with default values', () => {
      const region = new SpriteRegion()

      expect(region.width).toBe(0)
      expect(region.height).toBe(0)
      expect(region.x).toBe(0)
      expect(region.y).toBe(0)
    })

    it('creates a SpriteRegion with specified position', () => {
      const region = new SpriteRegion({ x: 5, y: 10 })

      expect(region.x).toBe(5)
      expect(region.y).toBe(10)
    })

    it('creates a SpriteRegion with specified size', () => {
      const region = new SpriteRegion({ width: 50, height: 100 })

      expect(region.width).toBe(50)
      expect(region.height).toBe(100)
    })
  })

  describe('Position', () => {
    it('get x returns correct position', () => {
      const region = new SpriteRegion({x: 5})

      expect(region.x).toBe(5)
    })

    it('get y returns correct position', () => {
      const region = new SpriteRegion({y: 10})

      expect(region.y).toBe(10)
    })

    it('set x assigns correct position', () => {
      const region = new SpriteRegion({x: 10})

      region.x = 20
      expect(region.x).toBe(20)
    })

    it('set y assigns correct position', () => {
      const region = new SpriteRegion({y: 10})

      region.y = 5
      expect(region.y).toBe(5)
    })
  })

  describe('Size', () => {
    const region = new SpriteRegion({x: 5, y: 10, width: 10, height: 20})

    it('get width returns correct size', () => {
      expect(region.width).toBe(10)
    })

    it('get height returns correct size', () => {
      expect(region.height).toBe(20)
    })

    it('set width assigns correct size', () => {
      region.width = 20
      expect(region.width).toBe(20)
    })

    it('set height assigns correct size', () => {
      region.height = 5
      expect(region.height).toBe(5)
    })
  })

  describe('Validation', () => {
    const region = new SpriteRegion()
    it('throws a RangeError when width is negative', () => {
      expect(() => region.width = -5).toThrow(RangeError)
    })

    it('throws a RangeError when height is negative', () => {
      expect(() => region.height = -5).toThrow(RangeError)
    })

    it('throws a TypeError when width is not a finite number', () => {
      expect(() => region.width = 'test').toThrow(TypeError)
      expect(() => region.width = NaN).toThrow(TypeError)
      expect(() => region.width = Infinity).toThrow(TypeError)
    })

    it('throws a TypeError when height is not a finite number', () => {
      expect(() => region.height = 'test').toThrow(TypeError)
      expect(() => region.height = NaN).toThrow(TypeError)
      expect(() => region.height = Infinity).toThrow(TypeError)
    })

    it('throws a TypeError when x is not a finite number', () => {
      expect(() => region.x = NaN).toThrow(TypeError)
      expect(() => region.x = 'test').toThrow(TypeError)
      expect(() => region.x = Infinity).toThrow(TypeError)
    })

    it('throws a TypeError when y is not a finite number', () => {
      expect(() => region.y = NaN).toThrow(TypeError)
      expect(() => region.y = 'test').toThrow(TypeError)
      expect(() => region.y = Infinity).toThrow(TypeError)
    })

    it('allows zero as position and size', () => {
      region.x = 0
      region.y = 0
      region.width = 0
      region.height = 0

      expect(region.x).toBe(0)
      expect(region.y).toBe(0)
      expect(region.width).toBe(0)
      expect(region.height).toBe(0)
    })

    it('allows position to be negative', () => {
      region.x = -10
      region.y = -5
      expect(region.x).toBe(-10)
      expect(region.y).toBe(-5)
    })
  })
})