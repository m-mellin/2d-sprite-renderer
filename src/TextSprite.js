export class TextSprite {
  #text
  #x
  #y
  #font
  #color
  
  constructor(text, {x = 0, y = 0, font = "16px sans-serif", color = "#000"} = {}) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.font = font;
    this.color = color;
  }

  get text() {
    return this.#text;
  }

  set text(text) {
    if (typeof text !== "string") {
      throw new TypeError("text must be a string");
    }

    this.#text = text;
  }

  get x() {
    return this.#x;
  }

  set x(x) {
    if (!Number.isFinite(x)) {
      throw new TypeError("x must be a finite number");
    }

    this.#x = x;
  }

  get y() {
    return this.#y;
  }

  set y(y) {
    if (!Number.isFinite(y)) {
      throw new TypeError("y must be a finite number");
    }

    this.#y = y;
  }

  get font() {
    return this.#font;
  }

  set font(font) {
    if (typeof font !== "string") {
      throw new TypeError("font must be a string");
    }

    this.#font = font;
  }

  get color() {
    return this.#color;
  }

  set color(color) {
    if (typeof color !== "string") {
      throw new TypeError("color must be a string");
    }

    this.#color = color;
  }

  get isLoaded() {
    return true;
  }

}