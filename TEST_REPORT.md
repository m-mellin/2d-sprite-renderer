# Test Report

<!--
    Commit this file to the root of your GitHub repository, alongside your module's code.
-->

## Summary

The `2d-sprite-renderer` module was tested primarily using automated unit tests with Vitest. Each public class was tested separetly to verify that it behavec correctly for both valid and invalid input.

The test covers:
- Sprite creation
- Sprite regions
- Image asset loading and caching
- Sprite rendering
- Animation frame handling

The module was also tested manually through the Test-App to verify that sprites and animations are rendered correctly on an `HTMLCanvasElement`.

Automated tests were used for testing functionality of each method.

Manual testing was used to verify that the visual result that was expected showed correctly.

## Test Results

**Example** (shows what a filled-in row can look like — remove this example table before
submitting):

| What was tested                                                        | How it was tested                                                                                                       | Result                                                                       |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `Jpeg.load(path)` returns a `Picture` instance for a valid image file. | Automated unit test (Vitest): loaded `test-image.jpg` and checked that the return value had `getHeight()`/`getWidth()` methods. | ✅ Passed.                                                                    |
| `Picture.getPixelAt(x, y)` with coordinates outside the image.         | Manual test via the Test-App's interface: entered a coordinate pair larger than the image's width/height and observed the output. | ❌ Didn't throw an error initially — fixed, now throws a clear exception. |

**Your test results:**

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------- |
|                   |                    |         |
|                   |                    |         |
|                   |                    |         |
|                   |                    |         |
|                   |                    |         |
