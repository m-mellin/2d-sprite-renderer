# Test Report

## Summary

The `2d-sprite-renderer` module was tested primarily using automated unit tests with Vitest.   
One test file per class. Each test file is split into different `describe`-blocks per method/property  
(example: `constructor`, `position`, `size` etc.).

The tests are easily reproducible by running the following command from the project root folder:

```bash
npm run test
```

The module was also tested manually through the Test-App to verify that sprites and animations are  
rendered correctly on an `HTMLCanvasElement`. Automated tests covered the functionality of each  
method, while manual testing verified the expected visual result.

## Test Results

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------- |
| `Sprite` constructor default and custom values (`x`, `y`, `width`, `height`, `region`). | Vitest: created `Sprite` with/without options, checked properties. | ✅ Passed. |
| `Sprite.x/y/width/height` get/set. | Vitest: set and read back each property. | ✅ Passed. |
| `Sprite.region` set, replace, and reset to `null`. | Vitest: assigned/read `region` in different combinations. | ✅ Passed. |
| `Sprite` input validation (negative size → `RangeError`, non-finite values → `TypeError`, invalid `region` type → `TypeError`, zero/negative position allowed). | Vitest: called setters/constructor with invalid and valid values. | ✅ Passed. |
| `Sprite.assignImageAsset(src)` updates image source. | Vitest: called method, checked `image.src`. | ✅ Passed. |
| `Sprite.isLoaded` and `waitForLoad()` returns a `Promise`. | Vitest: checked `isLoaded` and return type of `waitForLoad()`. | ✅ Passed. |
| `SpriteRegion` constructor default and custom values, get/set. | Vitest: created regions with/without options, checked properties. | ✅ Passed. |
| `SpriteRegion` input validation (same rules as `Sprite`). | Vitest: called setters with invalid and valid values. | ✅ Passed. |
| `SpriteAnimation` constructor sets first frame as current `region`. | Vitest: created animation, checked initial `region`. | ✅ Passed. |
| `SpriteAnimation.update()` frame timing (below, equal to, above duration). | Vitest: called `update` with varying `deltaTime`, checked `region`. | ✅ Passed. |
| `SpriteAnimation` loops back to first frame after last. | Vitest: ran `update` past last frame, checked `region`. | ✅ Passed. |
| `SpriteRenderer` constructor gets 2D context. | Vitest: mocked canvas, checked `getContext('2d')` call. | ✅ Passed. |
| `SpriteRenderer.add()` draws loaded sprites, waits on unloaded ones. | Vitest: added loaded/unloaded (mocked) sprites, checked `waitForLoad`. | ✅ Passed. |
| `SpriteRenderer.remove()` removes a sprite or does nothing if not found. | Vitest: removed added and non-added sprite, checked `drawImage`. | ✅ Passed. |
| `SpriteRenderer.clear()` clears canvas and removes all sprites. | Vitest: added sprite, called `clear()`, checked `clearRect` and subsequent `render()`. | ✅ Passed. |
| `SpriteRenderer.render()` clears canvas, skips unloaded sprites, draws with/without `region`. | Vitest: mocked sprites, checked `clearRect`/`drawImage` calls. | ✅ Passed. |
| `ImageAsset` constructor default state, image src, and instance identity. | Vitest: created assets with different/same src, checked `isLoaded`, `image.src`, and instance equality. | ✅ Passed. |
| `ImageAsset` loading state and `waitForLoad()` on success and failure. | Vitest: dispatched `load`/`error` events on the image, checked `isLoaded` and the resolved/rejected promise. | ✅ Passed. |
| `ImageAsset.getAsset()` caching (same instance for same src, different instances for different src). | Vitest: called `getAsset` with matching and differing sources, checked instance equality. | ✅ Passed. |
| Visual rendering, movement, and animation switching in the browser (`app.js`). | Manual: ran the app, pressed arrow keys, observed movement and animations. | ✅ Passed. |