import { describe, it, expect } from 'vitest'
import { Sprite } from './Sprite.js'
import { SpriteRegion } from './SpriteRegion.js'
import { SpriteAnimation } from './SpriteAnimation.js'

const src = '../src/spritesheet.png'

describe('SpriteAnimation', () => {
  const frame1 = new SpriteRegion(0, 0, 25, 25)
  const frame2 = new SpriteRegion(25, 0, 25, 25)
  const frame3 = new SpriteRegion(50, 0, 25, 25)

  describe('constructor', () => {
    it('creates an animation with the first frame as current region', () => {
      const animation = new SpriteAnimation([frame1, frame2, frame3], 100)

      expect(animation.region).toBe(frame1)
    })
  })

})