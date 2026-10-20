# 2d-sprite-renderer

[![npm version](https://img.shields.io/npm/v/2d-sprite-renderer.svg)](https://www.npmjs.com/package/2d-sprite-renderer)
[![CI](https://github.com/m-mellin/2d-sprite-renderer/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/m-mellin/2d-sprite-renderer/actions)

2d-sprite-renderer is a small JavaScript library for drawing and animating 2D sprites on an `HTMLCanvasElement`.

The library provides functionality for loading images, drawing sprites, working with spritesheets, creating sprite animations, and drawing text and coloured blocks.

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

### Drawing text and blocks

`TextSprite` draws a line of text, and `BlockSprite` draws a filled rectangle. Neither needs an image, so they can be drawn as soon as they are added.

A `TextSprite` measures its own `width` and `height`, which makes it easy to centre text or put a box around it:

```javascript
import { BlockSprite, SpriteRenderer, TextSprite } from '2d-sprite-renderer'

const canvas = document.querySelector('canvas')
const renderer = new SpriteRenderer(canvas)

const box = new BlockSprite({
  x: 50,
  y: 50,
  width: 300,
  height: 80,
  color: '#222'
})

const title = new TextSprite('NEW GAME', {
  font: '24px sans-serif',
  color: '#fff'
})

// Centre the text in the box
title.x = box.x + (box.width - title.width) / 2
title.y = box.y + (box.height - title.height) / 2

renderer.add(box)
renderer.add(title)
renderer.render()
```

The box is added first, so the text is drawn on top of it. The `y` of a `TextSprite` is the top of the text.

The size of a `TextSprite` is measured again every time its `text` or `font` changes, so it always matches what is drawn:

```javascript
title.text = 'GAME OVER'
title.x = box.x + (box.width - title.width) / 2 // centred again with the new width
```

A `BlockSprite` can be made see-through with an `rgba` colour. Changing the alpha value over time fades it in or out:

```javascript
const overlay = new BlockSprite({
  width: canvas.width,
  height: canvas.height,
  color: 'rgba(0, 0, 0, 0.5)'
})
```

## API

The library exposes seven** classes.

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

### `TextSprite`
**Added in version: 1.1.0** **
Represents a line of text.

`new TextSprite(text, { x, y, font, color })`

| Option | Default | Description |
| ------ | ------- | ----------- |
| `x` | `0` | The x coordinate of the text's left edge, in pixels. |
| `y` | `0` | The y coordinate of the text's top edge, in pixels. |
| `font` | `'16px sans-serif'` | A CSS font, for example `'24px "Press Start 2P"'`. |
| `color` | `'#000'` | A CSS colour. |

`text`, `x`, `y`, `font` and `color` can be changed after the text is created. `width` and `height` are read-only and are measured from the text and font. `isLoaded` is always `true`.

### `BlockSprite`
**Added in version: 1.1.0** **
Represents a filled rectangle.

`new BlockSprite({ x, y, width, height, color })`

| Option | Default | Description |
| ------ | ------- | ----------- |
| `x` | `0` | The x coordinate of the left edge, in pixels. |
| `y` | `0` | The y coordinate of the top edge, in pixels. |
| `width` | `0` | The width, in pixels. |
| `height` | `0` | The height, in pixels. |
| `color` | `'rgba(0, 0, 0, 1)'` | A CSS colour, for example `'#222'` or `'rgba(0, 0, 0, 0.5)'`. |

Every option can be changed after the block is created. `isLoaded` is always `true`.

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

| Command | What it does |
| ------- | ------------ |
| `npm test` | Runs all tests, and runs them again when a file changes. |
| `npm run test:run` | Runs all tests once. |
| `npm run test:unit` | Runs only the unit tests in `src/`. |
| `npm run test:integration` | Runs only the integration tests in `test/`. |
| `npm run test:run -- TextSprite` | Runs only the test files whose name contains `TextSprite`. |
| `npm run test:match -- "name"` | Runs only the tests whose name contains the given text. |
| `npm run lint` | Checks the code with ESLint. |
| `npm run format` | Formats the source code with Prettier. |
| `npm run format:check` | Checks that the source code is formatted. |

The tests run in [jsdom](https://github.com/jsdom/jsdom), which has no real canvas. Tests that draw or measure text therefore use a mocked 2D context.

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
5. Run the tests, linting and formatting check:
```bash
npm run test:run
npm run lint
npm run format:check
```
6. Commit your changes with a clear, descriptive message.
7. Push your branch and open a pull request against main, describing what you changed and why.

## Test report
The full test report can be found [here](TEST_REPORT.md).

## License
MIT, see [LICENSE](LICENSE)