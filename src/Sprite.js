
export class Sprite {
  #image
  #xPos
  #yPos

  constructor (image, xPos = 0, yPos = 0) {
    this.image = image
    this.xPos = xPos
    this.yPos = yPos
  }

  setPosition (xPos, yPos) {
    this.xPos = xPos
    this.yPos = yPos
  }

  getPositionX () {
    return this.xPos
  }

  getPositionY () {
    return this.yPos
  }

  getImage() {
    return this.image
  }
}

export class SpriteRenderer {
  #canvas
  #context
  #sprites

  constructor (canvas) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.sprites = []
  }

  add (sprite) {
    this.sprites.push(sprite)
  }

  render () {
    this.context.clearRect(
      0,
      0,
      800,
      600
    )

    for (const sprite of this.sprites) {
      this.context.drawImage(
        sprite.getImage(),
        sprite.getPositionX(),
        sprite.getPositionY()
      )
    }
  }
}