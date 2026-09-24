import { describe, it, expect } from 'vitest'
import { Sprite } from './Sprite.js'
import { SpriteRegion } from './SpriteRegion.js'

const src = '../src/mario.bmp'

describe('Sprite', () => {
  it('creates a Sprite with default values', () => {
    const sprite = new Sprite(src)

    expect(sprite.image).toBeInstanceOf(HTMLImageElement)
    expect(sprite.width).toBeUndefined()
    expect(sprite.height).toBeUndefined()
    expect(sprite.x).toBe(0)
    expect(sprite.y).toBe(0)
    expect(sprite.region).toBeNull()
  })

  it('creates a Sprite with specified position', () => {
    const sprite = new Sprite(src, {x: 5, y: 10})

    expect(sprite.x).toBe(5)
    expect(sprite.y).toBe(10)
  })

  it('creates a Sprite with specified size', () => {
    const sprite = new Sprite(src, {width: 50, height: 100})

    expect(sprite.width).toBe(50)
    expect(sprite.height).toBe(100)
  })

  it('sprite size can\'t be negative', () => {
    expect(() => new Sprite(src, {width: -50, height: 0})).toThrow()
    expect(() => new Sprite(src, {width: 0, height: -100})).toThrow()
  })

  it('changes x and y value after creating sprite', () => {
    const sprite = new Sprite(src, {x: 5, y: 5})

    sprite.x = 10
    sprite.y = 15
    expect(sprite.x).toBe(10)
    expect(sprite.y).toBe(15)
  })

  it('get x returns correct coordinate', () => {
    const sprite = new Sprite(src, {x: 5})

    expect(sprite.x).toBe(5)
  })

  it('get y returns correct coordinate', () => {
    const sprite = new Sprite(src, {y: 5})

    expect(sprite.y).toBe(5)
  })

  it('get width returns correct width', () => {
    const sprite = new Sprite(src, {width: 5})

    expect(sprite.width).toBe(5)
  })

  it('get height returns correct height', () => {
    const sprite = new Sprite(src, {height: 5})

    expect(sprite.height).toBe(5)
  })

  it('get region returns correct region', () => {
    const region = new SpriteRegion(25, 25, 50, 50)
    const sprite = new Sprite(src, { region })

    expect(sprite.region).toBe(region)
  })

  it('set region sets new region', () => {
    const region = new SpriteRegion(25, 25, 50, 50)
    const sprite = new Sprite(src, { region })

    const newRegion = new SpriteRegion(2, 2, 30, 30)
    sprite.region = newRegion

    expect(sprite.region).toBe(newRegion)
  })

  it('isLoaded returns false while sprite isn\'t loaded', () => {
    const sprite = new Sprite(src)

    expect(sprite.isLoaded).toBe(false)
  })

  it('waitForLoad() returns promise', () => {
    const sprite = new Sprite(src)

    expect(sprite.waitForLoad()).toBeInstanceOf(Promise)
  })

})