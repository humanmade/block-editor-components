# Image Utils

The Image Utils API provides functions specific to images.

- [`getImageDataForSize`](#getimagedataforsize)

## `getImageDataForSize`

The `getImageDataForSize` function allows for retrieving relevant image data for a given image size, in a normalized way.

### Usage

Pass an image object and an image size to `getImageDataForSize`, and then use the returned data, if any.

```js
const imageData = getImageDataForSize( image, 'thumbnail' );
if ( ! imageData ) {
	return;
}

const { src, width, height } = imageData;

// Use image data...
```

### Signature

```js
// getImageDataForSize :: ( image: object, size: string ) => object | null
const imageData = getImageDataForSize( image, size );
```

### Parameters

#### `image`

The image data object.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `object`                             | yes                                  | `undefined`                          |

#### `size`

The image size.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `string`                             | yes                                  | `undefined`                          |

### Return

The `getImageDataForSize` function returns an object with the image URL in the `src` property and height in width of the image in the `height` and `width` property, respectively.
If no image data was found for the given image size, the function returns `null`.

```js
const imageData = getImageDataForSize( image, size );
```
