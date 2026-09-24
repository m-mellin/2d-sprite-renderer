import { describe, it, expect } from 'vitest'
import { Sprite } from './Sprite.js'
import { SpriteRegion } from './SpriteRegion.js'
import { SpriteAnimation } from './SpriteAnimation.js'

const src = '../src/mario.bmp'

describe('Sprite', () => {
  describe('constructor', () => {
    it('creates a Sprite with default values', () => {
      const sprite = new Sprite(src)

      expect(sprite.image).toBeInstanceOf(HTMLImageElement)
      expect(sprite.width).toBe(0)
      expect(sprite.height).toBe(0)
      expect(sprite.x).toBe(0)
      expect(sprite.y).toBe(0)
      expect(sprite.region).toBeNull()
    })

    it('creates a Sprite with specified position', () => {
      const sprite = new Sprite(src, { x: 5, y: 10 })

      expect(sprite.x).toBe(5)
      expect(sprite.y).toBe(10)
    })

    it('creates a Sprite with specified size', () => {
      const sprite = new Sprite(src, { width: 50, height: 100 })

      expect(sprite.width).toBe(50)
      expect(sprite.height).toBe(100)
    })

    it('creates a Sprite with specified region', () => {
      const region = new SpriteRegion(0, 0, 25, 25)
      const sprite = new Sprite(src, { region })

      expect(sprite.region).toBe(region)
    })
  })

  describe('Position', () => {
    it('get x returns correct position', () => {
      const sprite = new Sprite(src, { x: 5 })

      expect(sprite.x).toBe(5)
    })

    it('get y returns correct position', () => {
      const sprite = new Sprite(src, { y: 5 })

      expect(sprite.y).toBe(5)
    })

    it('set x assigns correct position', () => {
      const sprite = new Sprite(src)

      sprite.x = 10
      expect(sprite.x).toBe(10)
    })

    it('set y assigns correct position', () => {
      const sprite = new Sprite(src)

      sprite.y = 10
      expect(sprite.y).toBe(10)
    })
  })

  describe('Size', () => {
    it('get width returns correct size', () => {
      const sprite = new Sprite(src, { width: 5 })

      expect(sprite.width).toBe(5)
    })

    it('get height returns correct size', () => {
      const sprite = new Sprite(src, { height: 5 })

      expect(sprite.height).toBe(5)
    })

    it('set width assigns correct size', () => {
      const sprite = new Sprite(src)
      sprite.width = 10

      expect(sprite.width).toBe(10)
    })

    it('set height assigns correct size', () => {
      const sprite = new Sprite(src)
      sprite.height = 10
      
      expect(sprite.height).toBe(10)
    })
  })

  describe('Region', () => {
    it('get region returns correct region', () => {
      const region = new SpriteRegion(0, 0, 25, 25)
      const sprite = new Sprite(src, { region })

      expect(sprite.region).toBe(region)
    })

    it('set region assigns correct region', () => {
      const region = new SpriteRegion(25, 25, 50, 50)
      const sprite = new Sprite(src, { region })

      const newRegion = new SpriteRegion(2, 2, 30, 30)
      sprite.region = newRegion

      expect(sprite.region).toBe(newRegion)
    })
    
    it('sets region to null', () => {
      const region = new SpriteRegion(25, 25, 50, 50)
      const sprite = new Sprite(src, { region })

      sprite.region = null

      expect(sprite.region).toBeNull()
    })
  })

  describe('Validation', () => {
    it('throws a RangeError when width is negative', () => {
      expect(() => new Sprite(src, {width: -50, height: 0})).toThrow(RangeError)
    })

    it('throws a RangeError when height is negative', () => {
      expect(() => new Sprite(src, {width: 0, height: -100})).toThrow(RangeError)
    })

    it('throws a TypeError when width is not a finite number', () => {
      const sprite = new Sprite(src)

      expect(() => sprite.width = 'test').toThrow(TypeError)
      expect(() => sprite.width = NaN).toThrow(TypeError)
      expect(() => sprite.width = Infinity).toThrow(TypeError)
    })

    it('throws a TypeError when height is not a finite number', () => {
      const sprite = new Sprite(src)

      expect(() => sprite.height = 'test').toThrow(TypeError)
      expect(() => sprite.height = NaN).toThrow(TypeError)
      expect(() => sprite.height = Infinity).toThrow(TypeError)
    })

    it('throws a TypeError when x is not a finite number', () => {
      const sprite = new Sprite(src)

      expect(() => sprite.x = NaN).toThrow(TypeError)
      expect(() => sprite.x = 'test').toThrow(TypeError)
      expect(() => sprite.x = Infinity).toThrow(TypeError)
    })

    it('throws a TypeError when y is not a finite number', () => {
      const sprite = new Sprite(src)

      expect(() => sprite.y = NaN).toThrow(TypeError)
      expect(() => sprite.y = 'test').toThrow(TypeError)
      expect(() => sprite.y = Infinity).toThrow(TypeError)
    })

    it('throws a TypeError if region is invalid type', () => {
      expect(() => new Sprite(src, { region: 4 })).toThrow(TypeError)
      expect(() => new Sprite(src, { region: new SpriteAnimation([], 150) })).toThrow(TypeError)
      expect(() => new Sprite(src, { region: new Sprite(src) })).toThrow(TypeError)
    })

    it('allows zero as position and size', () => {
      const sprite = new Sprite(src)

      sprite.x = 0
      sprite.y = 0
      sprite.width = 0
      sprite.height = 0

      expect(sprite.x).toBe(0)
      expect(sprite.y).toBe(0)
      expect(sprite.width).toBe(0)
      expect(sprite.height).toBe(0)
    })
  })

  describe('Image', () => {
    it('assignImageAsset changes the image source', () => {
      const sprite = new Sprite(src)

      sprite.assignImageAsset('../src/grass2.png')

      expect(sprite.image.src).toContain('grass2.png')
    })
  })

  describe('Loading', () => {
    it('isLoaded returns false while sprite isn\'t loaded', () => {
      const sprite = new Sprite(src)

      expect(sprite.isLoaded).toBe(false)
    })

    it('waitForLoad() returns promise', () => {
      const sprite = new Sprite(src)

      expect(sprite.waitForLoad()).toBeInstanceOf(Promise)
    })
  })
})