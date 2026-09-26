# 2d-sprite-renderer
2D-sprite-renderer is a small JavaScript-library for drawing and animating 2D-sprites on a HTMLCanvasElement.

The library contains five classes: 
- ImageAsset (loads images)
- Sprite (drawable image)
- SpriteRegion (a region of a spritesheet)
- SpriteAnimation (imagesequences)
- SpriteRenderer (draw everything on canvas).

## Installation
```bash
npm install github:m-mellin/2d-sprite-renderer
```

## Usage

### Basic example

```javascript
import { Sprite } from './src/Sprite.js'
import { SpriteRenderer } from './src/SpriteRenderer.js'

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

### Using a SpriteRegion (spritesheets)

If your image is a spritesheet, use `SpriteRegion` to draw only part of it:

```javascript
import { Sprite } from './src/Sprite.js'
import { SpriteRegion } from './src/SpriteRegion.js'
import { SpriteRenderer } from './src/SpriteRenderer.js'

const canvas = document.querySelector('canvas')
const renderer = new SpriteRenderer(canvas)

const region = new SpriteRegion({ x: 0, y: 0, width: 32, height: 32 })

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

### Animating a sprite

Combine `SpriteRegion` frames with `SpriteAnimation` to animate a sprite over time:

```javascript
import { Sprite } from './src/Sprite.js'
import { SpriteRegion } from './src/SpriteRegion.js'
import { SpriteAnimation } from './src/SpriteAnimation.js'
import { SpriteRenderer } from './src/SpriteRenderer.js'

const canvas = document.querySelector('canvas')
const renderer = new SpriteRenderer(canvas)

const frame1 = new SpriteRegion({ x: 0, y: 0, width: 32, height: 32 })
const frame2 = new SpriteRegion({ x: 32, y: 0, width: 32, height: 32 })

const animation = new SpriteAnimation([frame1, frame2], 150) // 150ms per frame

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

## Dependencies and versions

- Node.js >= 24.12.0
- [Vitest](https://vitest.dev/) `^5.0.0` — testing framework
- [JSDOM](https://github.com/jsdom/jsdom) `^30.1.1` — DOM environment for running canvas/image tests in Node

Dev tooling (linting/formatting):
- [ESLint](https://eslint.org/) `^10.10.0` with `@lnu/eslint-config` `^2.0.13`
- [Prettier](https://prettier.io/) `^3.9.6`

## Tests
```bash
npm test
```

## Bugs/Issues
Found a bug or have a feature request? Please open an issue in the [GitHub issue tracker](https://github.com/m-mellin/2d-sprite-renderer/issues), including:

- A short description of the problem or request
- Steps to reproduce (if it's a bug)
- Expected vs. actual behavior
- Relevant code snippets or a minimal example, if possible

## License
MIT, see [LICENSE](LICENSE)

## Version
Current version: `0.1.0`

## How to contribute
If you would like to contribute to the project, please follow the instructions below:

1. Fork the repository and clone it locally.
2. Create a new branch for your feature or fix (git checkout -b feature/my-feature).
3. Make your changes, following the existing code style (JSDoc comments on public and private methods, class-based structure).
4. Write or update tests for any new functionality or bug fix. Run npm run test to make sure the full suite passes.
5. Commit your changes with a clear, descriptive message.
6. Push your branch and open a pull request against main, describing what you changed and why.

## Test report
The full test report can be found [here](TEST_REPORT.md).