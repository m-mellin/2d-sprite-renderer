import { describe, it, expect, beforeEach } from 'vitest'
import { BlockSprite } from './BlockSprite.js'

describe('BlockSprite', () => {
  describe('constructor', () => {
    it('creates a BlockSprite with default values', () => {
      const block = new BlockSprite()

      expect(block.width).toBe(0)
      expect(block.height).toBe(0)
      expect(block.x).toBe(0)
      expect(block.y).toBe(0)
      expect(block.color).toBe('rgba(0, 0, 0, 1)')
    })

    it('creates a BlockSprite with specified position', () => {
      const block = new BlockSprite({ x: 20, y: 40 })

      expect(block.x).toBe(20)
      expect(block.y).toBe(40)
    })

    it('creates a BlockSprite with specified size', () => {
      const block = new BlockSprite({ width: 100, height: 200 })

      expect(block.width).toBe(100)
      expect(block.height).toBe(200)
    })
  })

  describe('Position', () => {
    let block

    beforeEach(() => {
      block = new BlockSprite({ x: 20, y: 20 })
    })

    it('get x returns correct position', () => {
      expect(block.x).toBe(20)
    })

    it('get y returns correct position', () => {
      expect(block.y).toBe(20)
    })

    it('set x assigns correct position', () => {
      block.x = 44
      expect(block.x).toBe(44)
    })

    it('set y assigns correct position', () => {
      block.y = 255
      expect(block.y).toBe(255)
    })
  })

  describe('Size', () => {
    let block

    beforeEach(() => {
      block = new BlockSprite({ width: 20, height: 20 })
    })

    it('get width returns correct size', () => {
      expect(block.width).toBe(20)
    })

    it('get height returns correct size', () => {
      expect(block.height).toBe(20)
    })

    it('set width assigns correct size', () => {
      block.width = 40
      expect(block.width).toBe(40)
    })

    it('set height assigns correct size', () => {
      block.height = 40
      expect(block.height).toBe(40)
    })
  })

  describe('Validation', () => {
    let block

    beforeEach(() => {
      block = new BlockSprite()
    })

    it('throws a RangeError when width is negative', () => {
      expect(() => (block.width = -5)).toThrow(RangeError)
    })

    it('throws a RangeError when height is negative', () => {
      expect(() => (block.height = -5)).toThrow(RangeError)
    })

    it('throws a TypeError when width is not a finite number', () => {
      expect(() => (block.width = 'test')).toThrow(TypeError)
      expect(() => (block.width = NaN)).toThrow(TypeError)
      expect(() => (block.width = Infinity)).toThrow(TypeError)
    })

    it('throws a TypeError when height is not a finite number', () => {
      expect(() => (block.height = 'test')).toThrow(TypeError)
      expect(() => (block.height = NaN)).toThrow(TypeError)
      expect(() => (block.height = Infinity)).toThrow(TypeError)
    })

    it('throws a TypeError when x is not a finite number', () => {
      expect(() => (block.x = NaN)).toThrow(TypeError)
      expect(() => (block.x = 'test')).toThrow(TypeError)
      expect(() => (block.x = Infinity)).toThrow(TypeError)
    })

    it('throws a TypeError when y is not a finite number', () => {
      expect(() => (block.y = NaN)).toThrow(TypeError)
      expect(() => (block.y = 'test')).toThrow(TypeError)
      expect(() => (block.y = Infinity)).toThrow(TypeError)
    })

    it('allows zero as position and size', () => {
      block.x = 0
      block.y = 0
      block.width = 0
      block.height = 0

      expect(block.x).toBe(0)
      expect(block.y).toBe(0)
      expect(block.width).toBe(0)
      expect(block.height).toBe(0)
    })

    it('allows position to be negative', () => {
      block.x = -10
      block.y = -5
      expect(block.x).toBe(-10)
      expect(block.y).toBe(-5)
    })

    it('should always be ready to draw', () => {
      expect(block.isLoaded).toBeTruthy()
    })
  })
})