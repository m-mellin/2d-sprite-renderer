import { describe, it, expect } from 'vitest'
import { SpriteRegion } from './SpriteRegion.js'
import { SpriteAnimation } from './SpriteAnimation.js'

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

  describe('Update', () => {
    it('does not change frame while elapsed time is less than frame duration', () => {
      const animation = new SpriteAnimation([frame1, frame2], 100)

      animation.update(75)
      
      expect(animation.region).toBe(frame1)
    })

    it('changes to next frame when elapsed time is equal to frame duration', () => {
      const animation = new SpriteAnimation([frame1, frame2], 100)

      animation.update(100)

      expect(animation.region).toBe(frame2)
    })

    it('changes frame when elapsed time is greater than frame duration', () => {
      const animation = new SpriteAnimation([frame1, frame2], 100)

      animation.update(125)

      expect(animation.region).toBe(frame2)
    })

    it('returns to first frame after last frame', () => {
      const animation = new SpriteAnimation([frame1, frame2], 100)

      animation.update(100)
      animation.update(100)

      expect(animation.region).toBe(frame1)
    })
  })
})