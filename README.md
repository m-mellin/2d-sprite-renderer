# 2d-sprite-renderer

[![npm version](https://img.shields.io/npm/v/2d-sprite-renderer.svg)](https://www.npmjs.com/package/2d-sprite-renderer)
[![CI](https://github.com/m-mellin/2d-sprite-renderer/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/m-mellin/2d-sprite-renderer/actions)

2d-sprite-renderer is a small JavaScript library for drawing and animating 2D sprites on an `HTMLCanvasElement`.

The library provides functionality for loading images, drawing sprites, working with spritesheets, and creating sprite animations.

## Installation

Install the package from npm:

```bash
npm install 2d-sprite-renderer
```

## Usage

### Basic example

Create a renderer, add a sprite, and render it to a canvas:
```javascript
import { Sprite, SpriteRenderer } from '2d-sprite-renderer'

const canvas = document.querySelector('canvas')
const renderer = new SpriteRenderer(canvas)

const sprite = new Sprite('./assets/mario.png', {
  x: 50,
  y: 50,
  width: 64,
  height: 64
})

renderer.add(sprite)
renderer.render()
```

The `SpriteRenderer` automatically waits for a sprite's image to finish loading before drawing it, so `render()` can be called immediately after adding a sprite.

### Using a SpriteRegion

If your image is a spritesheet, use `SpriteRegion` to draw only part of it:

```javascript
import {
  Sprite,
  SpriteRegion,
  SpriteRenderer
} from '2d-sprite-renderer'

const canvas = document.querySelector('canvas')
const renderer = new SpriteRenderer(canvas)

const region = new SpriteRegion({
  x: 0,
  y: 0,
  width: 32,
  height: 32
})

const sprite = new Sprite('./assets/spritesheet.png', {
  x: 100,
  y: 100,
  width: 32,
  height: 32,
  region
})

renderer.add(sprite)
renderer.render()
```

`SpriteRegion` defines the rectangular area of the source image that should be drawn.

### Animating a sprite

Combine `SpriteRegion` frames with `SpriteAnimation` to animate a sprite over time:

```javascript
import {
  Sprite,
  SpriteAnimation,
  SpriteRegion,
  SpriteRenderer
} from '2d-sprite-renderer'

const canvas = document.querySelector('canvas')
const renderer = new SpriteRenderer(canvas)

const frame1 = new SpriteRegion({
  x: 0,
  y: 0,
  width: 32,
  height: 32
})

const frame2 = new SpriteRegion({
  x: 32,
  y: 0,
  width: 32,
  height: 32
})

const animation = new SpriteAnimation(
  [frame1, frame2],
  150
) // 150 ms per frame

const sprite = new Sprite('./assets/spritesheet.png', {
  x: 100,
  y: 100,
  width: 32,
  height: 32
})

renderer.add(sprite)

let previousTime = 0

function loop (time) {
  const deltaTime = time - previousTime
  previousTime = time

  animation.update(deltaTime)
  sprite.region = animation.region

  renderer.render()

  requestAnimationFrame(loop)
}

requestAnimationFrame(loop)
```

## API

The library exposes five classes.

### `ImageAsset`

Handles image loading and caching.

`ImageAsset` makes it possible to load images asynchronously while avoiding unnecessary repeated loading of the same image.

### `Sprite`

Represents a drawable image.

A `Sprite` contains its position, dimensions, image source, and optionally a `SpriteRegion`.

### `SpriteRegion`

Defines a rectangular region of an image.

This is useful when working with spritesheets where multiple sprite frames are stored in a single image.

### `SpriteAnimation`

Handles animations using a sequence of `SpriteRegion` frames.

The animation advances between frames based on the elapsed time supplied to update().

### `SpriteRenderer`

Manages sprites and renders them to an `HTMLCanvasElement`.

The renderer handles image loading and draws the registered sprites to the canvas.

## Requirements

- Node.js >= 24.12.0
- A browser environment with support for `HTMLCanvasElement`

## Development
Clone the repository and install the development dependencies:

```bash
npm install
```

Run tests

```bash
npm test
```

Run linting

```bash
npm run lint
```

Format source code

```bash
npm run format
```

Check formatting

```bash
npm run fomat:check
```

## Bugs/Issues
Found a bug or have a feature request? Please open an issue in the [GitHub issue tracker](https://github.com/m-mellin/2d-sprite-renderer/issues), including:

- A short description of the problem or request
- Steps to reproduce (if it's a bug)
- Expected vs. actual behavior
- Relevant code snippets or a minimal example, if possible

## How to contribute
If you would like to contribute to the project, please follow the instructions below:

1. Fork the repository and clone it locally.
2. Create a new branch for your feature or fix 
```bash
git checkout -b feature/my-feature
```
3. Make your changes, following the existing code style (JSDoc comments on public and private methods, class-based structure).
4. Write or update tests for any new functionality or bug fix.
5. Run the tests and linting:
```bash
npm test
npm run lint
```
5. Commit your changes with a clear, descriptive message.
6. Push your branch and open a pull request against main, describing what you changed and why.

## Test report
The full test report can be found [here](TEST_REPORT.md).

## License
MIT, see [LICENSE](LICENSE)