import { describe, it, expect } from 'vitest'
import { SpriteRegion } from './SpriteRegion.js'

describe('SpriteRegion', () => {
  describe('constructor', () => {

  })
  describe('Position', () => {
    it('get x returns correct position', () => {
      const region = new SpriteRegion(5, 10, 35, 35)

      expect(region.x).toBe(5)
    })

    it('get y returns correct position', () => {
      const region = new SpriteRegion(5, 10, 35, 35)

      expect(region.y).toBe(10)
    })

    it('set x assigns correct position', () => {
      const region = new SpriteRegion(5, 10, 35, 35)

      region.x = 20
      expect(region.x).toBe(20)
    })

    it('set y assigns correct position', () => {
      const region = new SpriteRegion(5, 10, 35, 35)

      region.y = 5
      expect(region.y).toBe(5)
    })
  })
})