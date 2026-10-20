# Test Report

## Summary

The `2d-sprite-renderer` module was tested primarily using automated unit tests with **Vitest**.   
One test file per class. Each test file is split into different `describe`-blocks per method/property  
(example: `constructor`, `position`, `size` etc.). In addition, a set of integration tests verifies that  
the classes work correctly together (`Sprite` + `ImageAsset`, `Sprite` + `SpriteRegion` + `SpriteRenderer`,  
and `Sprite` + `SpriteAnimation` + `SpriteRenderer` + `SpriteRegion`), using real instances instead of mocks  
wherever possible.

The tests are easily reproducible by running the following command from the project root folder:

```bash
npm run test
```

The module was also tested manually through the Test-App to verify that sprites and animations are  
rendered correctly on an `HTMLCanvasElement`. Automated tests covered the functionality of each  
method, while manual testing verified the expected visual result.

## Automated Test Results

### Sprite.test.js

| What was tested | How it was tested | Test Type | Result |
| ---------------- | ------------------ | --------- | ------- |
| Creates a Sprite with default values. | Created a `Sprite`, checked `image`, `width`, `height`, `x`, `y`, `region`. | Unit | ✅ Passed |
| Creates a Sprite with specified position. | Created a `Sprite` with `x`/`y` options, checked values. | Unit | ✅ Passed |
| Creates a Sprite with specified size. | Created a `Sprite` with `width`/`height` options, checked values. | Unit | ✅ Passed |
| Creates a Sprite with specified region. | Created a `Sprite` with a `region` option, checked `region`. | Unit | ✅ Passed |
| Get `x` returns correct position. | Created a `Sprite` with `x` set, read `x`. | Unit | ✅ Passed |
| Get `y` returns correct position. | Created a `Sprite` with `y` set, read `y`. | Unit | ✅ Passed |
| Set `x` assigns correct position. | Set `x` on a `Sprite`, read it back. | Unit | ✅ Passed |
| Set `y` assigns correct position. | Set `y` on a `Sprite`, read it back. | Unit | ✅ Passed |
| Get `width` returns correct size. | Created a `Sprite` with `width` set, read `width`. | Unit | ✅ Passed |
| Get `height` returns correct size. | Created a `Sprite` with `height` set, read `height`. | Unit | ✅ Passed |
| Set `width` assigns correct size. | Set `width` on a `Sprite`, read it back. | Unit | ✅ Passed |
| Set `height` assigns correct size. | Set `height` on a `Sprite`, read it back. | Unit | ✅ Passed |
| Get `region` returns correct region. | Created a `Sprite` with a `region`, read `region`. | Unit | ✅ Passed |
| Set `region` assigns correct region. | Set a new `region` on a `Sprite`, read it back. | Unit | ✅ Passed |
| Sets `region` to `null`. | Set `region` to `null` on a `Sprite`, checked value. | Unit | ✅ Passed |
| Throws `RangeError` when `width` is negative. | Called constructor with negative `width`. | Unit | ✅ Passed |
| Throws `RangeError` when `height` is negative. | Called constructor with negative `height`. | Unit | ✅ Passed |
| Throws `TypeError` when `width` is not a finite number. | Set `width` to `'test'`, `NaN`, and `Infinity`. | Unit | ✅ Passed |
| Throws `TypeError` when `height` is not a finite number. | Set `height` to `'test'`, `NaN`, and `Infinity`. | Unit | ✅ Passed |
| Throws `TypeError` when `x` is not a finite number. | Set `x` to `NaN`, `'test'`, and `Infinity`. | Unit | ✅ Passed |
| Throws `TypeError` when `y` is not a finite number. | Set `y` to `NaN`, `'test'`, and `Infinity`. | Unit | ✅ Passed |
| Throws `TypeError` if `region` is an invalid type. | Passed a number, a `SpriteAnimation`, and a `Sprite` as `region`. | Unit | ✅ Passed |
| Allows zero as position and size. | Set `x`, `y`, `width`, `height` to `0`, checked values. | Unit | ✅ Passed |
| Allows position to be negative. | Created a `Sprite` with negative `x`/`y`, checked values. | Unit | ✅ Passed |
| `assignImageAsset` changes the image source. | Called `assignImageAsset` with a new source, checked `image.src`. | Unit | ✅ Passed |
| `isLoaded` returns `false` while sprite isn't loaded. | Created a `Sprite`, checked `isLoaded`. | Unit | ✅ Passed |
| `waitForLoad()` returns a `Promise`. | Called `waitForLoad()`, checked return type. | Unit | ✅ Passed |

### SpriteRegion.test.js

| What was tested | How it was tested | Test Type | Result |
| ---------------- | ------------------ | --------- | ------- |
| Creates a SpriteRegion with default values. | Created a `SpriteRegion` with no options, checked `x`, `y`, `width`, `height`. | Unit | ✅ Passed |
| Creates a SpriteRegion with specified position. | Created a `SpriteRegion` with `x`/`y` options, checked values. | Unit | ✅ Passed |
| Creates a SpriteRegion with specified size. | Created a `SpriteRegion` with `width`/`height` options, checked values. | Unit | ✅ Passed |
| Get `x` returns correct position. | Created a `SpriteRegion` with `x` set, read `x`. | Unit | ✅ Passed |
| Get `y` returns correct position. | Created a `SpriteRegion` with `y` set, read `y`. | Unit | ✅ Passed |
| Set `x` assigns correct position. | Set `x` on a `SpriteRegion`, read it back. | Unit | ✅ Passed |
| Set `y` assigns correct position. | Set `y` on a `SpriteRegion`, read it back. | Unit | ✅ Passed |
| Get `width` returns correct size. | Created a `SpriteRegion` with size set, read `x` (test only checks `x`). | Unit | ✅ Passed |
| Get `height` returns correct size. | Created a `SpriteRegion` with size set, read `y` (test only checks `y`). | Unit | ✅ Passed |
| Set `width` assigns correct size. | Set `x` on the region, read it back (test only checks `x`). | Unit | ✅ Passed |
| Set `height` assigns correct size. | Set `y` on the region, read it back (test only checks `y`). | Unit | ✅ Passed |
| Throws `RangeError` when `width` is negative. | Set `width` to a negative value. | Unit | ✅ Passed |
| Throws `RangeError` when `height` is negative. | Set `height` to a negative value. | Unit | ✅ Passed |
| Throws `TypeError` when `width` is not a finite number. | Set `width` to `'test'`, `NaN`, and `Infinity`. | Unit | ✅ Passed |
| Throws `TypeError` when `height` is not a finite number. | Set `height` to `'test'`, `NaN`, and `Infinity`. | Unit | ✅ Passed |
| Throws `TypeError` when `x` is not a finite number. | Set `x` to `NaN`, `'test'`, and `Infinity`. | Unit | ✅ Passed |
| Throws `TypeError` when `y` is not a finite number. | Set `y` to `NaN`, `'test'`, and `Infinity`. | Unit | ✅ Passed |
| Allows zero as position and size. | Set `x`, `y`, `width`, `height` to `0`, checked values. | Unit | ✅ Passed |
| Allows position to be negative. | Set `x`/`y` to negative values, checked values. | Unit | ✅ Passed |

### SpriteAnimation.test.js

| What was tested | How it was tested | Test Type | Result |
| ---------------- | ------------------ | --------- | ------- |
| Creates an animation with the first frame as current region. | Created a `SpriteAnimation` with three frames, checked `region`. | Unit | ✅ Passed |
| Does not change frame while elapsed time is less than frame duration. | Called `update(75)` with 100ms frame duration, checked `region`. | Unit | ✅ Passed |
| Changes to next frame when elapsed time equals frame duration. | Called `update(100)` with 100ms frame duration, checked `region`. | Unit | ✅ Passed |
| Changes frame when elapsed time is greater than frame duration. | Called `update(125)` with 100ms frame duration, checked `region`. | Unit | ✅ Passed |
| Returns to first frame after last frame. | Called `update(100)` twice on a two-frame animation, checked `region`. | Unit | ✅ Passed |

### SpriteRenderer.test.js

| What was tested | How it was tested | Test Type | Result |
| ---------------- | ------------------ | --------- | ------- |
| Creates a SpriteRenderer. | Created a `SpriteRenderer` with a mocked canvas, checked instance type. | Unit | ✅ Passed |
| Gets the 2D rendering context from the canvas. | Created a `SpriteRenderer`, checked `canvas.getContext` was called with `'2d'`. | Unit | ✅ Passed |
| Adds a loaded sprite to the renderer. | Added a mocked loaded sprite, called `render()`, checked `drawImage` args. | Unit | ✅ Passed |
| Waits for an unloaded sprite before rendering. | Added a mocked unloaded sprite, checked `waitForLoad` was called. | Unit | ✅ Passed |
| Removes a sprite from the renderer. | Added then removed a sprite, called `render()`, checked `drawImage` not called. | Unit | ✅ Passed |
| Does nothing when the sprite is not in the renderer. | Called `remove()` on a sprite never added, called `render()`, checked `drawImage` not called. | Unit | ✅ Passed |
| Removes all sprites and clears the canvas. | Added a sprite, called `clear()`, checked `clearRect` args and that a following `render()` doesn't draw. | Unit | ✅ Passed |
| Clears the canvas before rendering sprites. | Called `render()` with no sprites added, checked `clearRect` args. | Unit | ✅ Passed |
| Does not render an unloaded sprite. | Added a mocked unloaded sprite, called `render()`, checked `drawImage` not called. | Unit | ✅ Passed |
| Renders a sprite using its whole image. | Added a mocked loaded sprite with no region, called `render()`, checked `drawImage` args (5-arg form). | Unit | ✅ Passed |
| Renders a sprite using its image region. | Added a mocked loaded sprite with a real `SpriteRegion`, called `render()`, checked `drawImage` args (9-arg form). | Unit | ✅ Passed |

### ImageAsset.test.js

| What was tested | How it was tested | Test Type | Result |
| ---------------- | ------------------ | --------- | ------- |
| Creates an ImageAsset with `isLoaded` initially `false`. | Created an `ImageAsset`, checked `isLoaded`. | Unit | ✅ Passed |
| Sets the image source to the assigned source. | Created an `ImageAsset`, checked `image.src` contains the given source. | Unit | ✅ Passed |
| Exposes an `HTMLImageElement` via the `image` getter. | Created an `ImageAsset`, checked `image` instance type. | Unit | ✅ Passed |
| Creates a new instance, even with the same `src`. | Created two `ImageAsset`s with the same source, checked they're not the same instance. | Unit | ✅ Passed |
| Sets `isLoaded` to `true` when image is loaded. | Dispatched a `load` event on `image`, checked `isLoaded`. | Unit | ✅ Passed |
| `waitForLoad()` resolves once the image has loaded. | Dispatched a `load` event, awaited `waitForLoad()`, checked it resolves. | Unit | ✅ Passed |
| `waitForLoad()` rejects if the image fails to load. | Dispatched an `error` event, awaited `waitForLoad()`, checked it rejects. | Unit | ✅ Passed |
| `isLoaded` remains `false` if the image fails to load. | Dispatched an `error` event, checked `isLoaded` after rejection. | Unit | ✅ Passed |
| `getAsset()` returns the same instance for the same source. | Called `getAsset()` twice with the same source, checked same instance. | Unit | ✅ Passed |
| `getAsset()` returns different instances for different sources. | Called `getAsset()` with two different sources, checked different instances. | Unit | ✅ Passed |

### integration.test.js

| What was tested | How it was tested | Test Type | Result |
| ---------------- | ------------------ | --------- | ------- |
| `Sprite` reflects the real loading of the image. | Created a real `Sprite`, dispatched a `load` event on its image, awaited `waitForLoad()`, checked `isLoaded`. | Integration | ✅ Passed |
| `assignImageAsset` swaps the image and resets the loading state. | Created a real `Sprite`, called `assignImageAsset` with a new source, checked `image` type and `isLoaded`. | Integration | ✅ Passed |
| Renders a real loaded `Sprite` using its whole image. | Created a real `Sprite`, loaded it, added to a real `SpriteRenderer`, rendered, checked `drawImage` args (5-arg form). | Integration | ✅ Passed |
| Renders a real loaded `Sprite` using a real `SpriteRegion`. | Created a real `Sprite` with a real `SpriteRegion`, loaded it, rendered, checked `drawImage` args (9-arg form). | Integration | ✅ Passed |
| Draws the frame matching the animation. | Created a real `Sprite`, two `SpriteRegion` frames, and a `SpriteAnimation`; advanced it, assigned `animation.region` to `sprite.region`, rendered twice, checked `drawImage` args per frame. | Integration | ✅ Passed |

### TextSprite.test.js

*Added in version 1.1.0.* Text measuring uses a mocked canvas context, where every character is as wide as the font size.

| What was tested | How it was tested | Test Type | Result |
| ---------------- | ------------------ | --------- | ------- |
| Creates a TextSprite with default values. | Created a `TextSprite` with only a text, checked `text`, `x`, `y`, `font` (`'16px sans-serif'`) and `color` (`'#000'`). | Unit | ✅ Passed |
| Creates a TextSprite with specified position. | Created a `TextSprite` with `x`/`y` options, checked values. | Unit | ✅ Passed |
| Creates a TextSprite with specified font. | Created a `TextSprite` with a `font` option, checked `font`. | Unit | ✅ Passed |
| Creates a TextSprite with specified color. | Created a `TextSprite` with a `color` option, checked `color`. | Unit | ✅ Passed |
| Get `x` returns correct position. | Created a `TextSprite` with `x` set, read `x`. | Unit | ✅ Passed |
| Get `y` returns correct position. | Created a `TextSprite` with `y` set, read `y`. | Unit | ✅ Passed |
| Set `x` assigns correct position. | Set `x` on a `TextSprite`, read it back. | Unit | ✅ Passed |
| Set `y` assigns correct position. | Set `y` on a `TextSprite`, read it back. | Unit | ✅ Passed |
| Knows its width as soon as it is created. | Created `'test'` in `10px`, checked that `width` is 40 without changing anything. | Unit | ✅ Passed |
| Knows its height as soon as it is created. | Created `'test'` in `10px`, checked that `height` is 10. | Unit | ✅ Passed |
| Measures again when the text changes. | Changed `text` to `'longer text'`, checked that `width` is 110. | Unit | ✅ Passed |
| Measures again when the font changes. | Changed `font` to `20px`, checked that `width` is 80 and `height` is 20. | Unit | ✅ Passed |
| Has no width for an empty text. | Changed `text` to `''`, checked that `width` is 0. | Unit | ✅ Passed |
| `width` cannot be set from outside. | Assigned `width`, checked that it throws `TypeError` (read-only). | Unit | ✅ Passed |
| `height` cannot be set from outside. | Assigned `height`, checked that it throws `TypeError` (read-only). | Unit | ✅ Passed |
| Throws `TypeError` when the text is not a string. | Created a `TextSprite` with `42`, `null` and `undefined` as text. | Unit | ✅ Passed |
| Throws `TypeError` when `x` is not a finite number. | Set `x` to `NaN`, `Infinity` and `'10'`. | Unit | ✅ Passed |
| Throws `TypeError` when `y` is not a finite number. | Set `y` to `NaN`, `Infinity` and `'10'`. | Unit | ✅ Passed |
| Throws `TypeError` when the font is not a string. | Set `font` to `16` and `null`. | Unit | ✅ Passed |
| Throws `TypeError` when the color is not a string. | Set `color` to `0` and `null`. | Unit | ✅ Passed |
| Allows zero as position. | Set `x` and `y` to `0`, checked values. | Unit | ✅ Passed |
| Allows position to be negative. | Set `x`/`y` to negative values, checked values. | Unit | ✅ Passed |
| `isLoaded` is always `true`. | Created a `TextSprite`, checked `isLoaded`. | Unit | ✅ Passed |

### BlockSprite.test.js

*Added in version 1.1.0.*

| What was tested | How it was tested | Test Type | Result |
| ---------------- | ------------------ | --------- | ------- |
| Creates a BlockSprite with default values. | Created a `BlockSprite` with no options, checked `width`, `height`, `x`, `y` (all `0`) and `color` (`'rgba(0, 0, 0, 1)'`). | Unit | ✅ Passed |
| Creates a BlockSprite with specified position. | Created a `BlockSprite` with `x`/`y` options, checked values. | Unit | ✅ Passed |
| Creates a BlockSprite with specified size. | Created a `BlockSprite` with `width`/`height` options, checked values. | Unit | ✅ Passed |
| Get `x` returns correct position. | Created a `BlockSprite` with `x` set, read `x`. | Unit | ✅ Passed |
| Get `y` returns correct position. | Created a `BlockSprite` with `y` set, read `y`. | Unit | ✅ Passed |
| Set `x` assigns correct position. | Set `x` on a `BlockSprite`, read it back. | Unit | ✅ Passed |
| Set `y` assigns correct position. | Set `y` on a `BlockSprite`, read it back. | Unit | ✅ Passed |
| Get `width` returns correct size. | Created a `BlockSprite` with `width` set, read `width`. | Unit | ✅ Passed |
| Get `height` returns correct size. | Created a `BlockSprite` with `height` set, read `height`. | Unit | ✅ Passed |
| Set `width` assigns correct size. | Set `width` on a `BlockSprite`, read it back. | Unit | ✅ Passed |
| Set `height` assigns correct size. | Set `height` on a `BlockSprite`, read it back. | Unit | ✅ Passed |
| Throws `RangeError` when `width` is negative. | Set `width` to `-5`. | Unit | ✅ Passed |
| Throws `RangeError` when `height` is negative. | Set `height` to `-5`. | Unit | ✅ Passed |
| Throws `TypeError` when `width` is not a finite number. | Set `width` to `'test'`, `NaN`, and `Infinity`. | Unit | ✅ Passed |
| Throws `TypeError` when `height` is not a finite number. | Set `height` to `'test'`, `NaN`, and `Infinity`. | Unit | ✅ Passed |
| Throws `TypeError` when `x` is not a finite number. | Set `x` to `NaN`, `'test'`, and `Infinity`. | Unit | ✅ Passed |
| Throws `TypeError` when `y` is not a finite number. | Set `y` to `NaN`, `'test'`, and `Infinity`. | Unit | ✅ Passed |
| Allows zero as position and size. | Set `x`, `y`, `width`, `height` to `0`, checked values. | Unit | ✅ Passed |
| Allows position to be negative. | Set `x`/`y` to negative values, checked values. | Unit | ✅ Passed |
| `isLoaded` is always `true`. | Created a `BlockSprite`, checked `isLoaded`. | Unit | ✅ Passed |

## Manual Test Result

| What was tested | How it was tested | Test Type | Result |
| ---------------- | ------------------ | --------- | ------- |
| Visual rendering, movement, and animation switching in the browser (`app.js`). | Ran the app, pressed arrow keys, observed movement and animations. | Manual | ✅ Passed |
| Using the published module in a separate project. | Created a new project, ran `npm install 2d-sprite-renderer` and imported the classes in VS Code. | Manual | ❌ Failed, see issue #1 |
| Using the published module again after the fix (version 1.0.5). | Ran `npm i 2d-sprite-renderer@latest` in the same project and restarted the TS server. | Manual | ✅ Passed |
| Centring a `TextSprite` whose text is set after it is created. | In Checkpoint Twentyone, created a `TextSprite` with an empty text, set the text to `'DAY 1'` and centred it with `width`. | Manual | ❌ Failed: the text started at the middle of the screen, because the size was only measured in the constructor. Fixed by measuring again in `set text` and `set font`. |
| Centring a `TextSprite` after the fix. | Repeated the test above with the fixed version. | Manual | ✅ Passed |
| Drawing and fading a `BlockSprite`. | In Checkpoint Twentyone, covered the game with a `BlockSprite` and changed the alpha in its `rgba` colour every frame. | Manual | ✅ Passed |

## Lack of tests

Because of limited time, `TextSprite` and `BlockSprite` are only covered by unit tests of the classes
themselves. There are no automated tests yet that check how `SpriteRenderer` draws them, neither in
`SpriteRenderer.test.js` nor in `integration.test.js`. Drawing text and blocks, their order and fading a
`BlockSprite` were instead verified manually in the application Checkpoint Twentyone (see
*Manual Test Result*). Automated tests for drawing them are planned for a later release.