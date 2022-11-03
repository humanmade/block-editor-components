# Block Utils

The Block Utils API provides functions specific to blocks.

- [`findBlockByName`](#findblockbyname)
- [`findInvalidBlock`](#findinvalidblock)
- [`findInvalidBlocks`](#findinvalidblocks)
- [`findValidBlock`](#findvalidblock)
- [`findValidBlocks`](#findvalidblocks)

## `findBlockByName`

The `findBlockByName` function allows for finding the first block in the editor for the given block name.

### Usage

Pass a block name to `findBlockByName`, and then use the returned block, if any.

```js
const imageBlock = findBlockByName( 'core/image' );
if ( ! imageBlock ) {
	return;
}

// Use imageBlock...
```

### Signature

```js
// findBlockByName :: ( blockName: string ) => ?object
const block = findBlockByName( blockName );
```

### Parameters

#### `blockName`

The name of the block.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `string`                             | yes                                  | `undefined`                          |

### Return

The `findBlockByName` function returns the first block in the editor for the given block name.
If no block was found, the function returns `undefined`.

```js
const block = findBlockByName( blockName );
```

## `findInvalidBlock`

The `findInvalidBlock` function allows for finding the first block that is considered "invalid", given a validation function and a list of blocks to test.

### Usage

Pass an array of blocks and a validation function taking a single block as argument to `findInvalidBlock`, and then use the returned block, if any.

```js
const customBlock = findInvalidBlock( blocks, ( { name } ) => /^core\//.test( name ) );
if ( ! customBlock ) {
	return;
}

// Use customBlock...
```

### Signature

```js
// findInvalidBlock :: ( blocks: object[], isValid: Function ) => ?object
const invalidBlock = findInvalidBlock( blocks, isValid );
```

### Parameters

#### `blocks`

An array of blocks.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `object[]`                           | yes                                  | `undefined`                          |

#### `isValid`

A validation function, taking a single block object as only argument, and returning a Boolean value.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `Function`                           | yes                                  | `undefined`                          |

### Return

The `findInvalidBlock` function returns the first block from the given blocks that is "invalid" with respect to the passed validation function.
If no block was found, the function returns `undefined`.

```js
const invalidBlock = findInvalidBlock( blocks, isValid );
```

## `findInvalidBlocks`

The `findInvalidBlocks` function allows for finding all blocks that are considered "invalid", given a validation function and a list of blocks to test.

### Usage

Pass an array of blocks and a validation function taking a single block as argument to `findInvalidBlocks`, and then use the returned blocks, if any.

```js
const customBlocks = findInvalidBlocks( blocks, ( { name } ) => /^core\//.test( name ) );
if ( ! customBlocks.length ) {
	return;
}

// Use customBlocks...
```

### Signature

```js
// findInvalidBlocks :: ( blocks: object[], isValid: Function ) => object[]
const invalidBlocks = findInvalidBlocks( blocks, isValid );
```

### Parameters

#### `blocks`

An array of blocks.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `object[]`                           | yes                                  | `undefined`                          |

#### `isValid`

A validation function, taking a single block object as only argument, and returning a Boolean value.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `Function`                           | yes                                  | `undefined`                          |

### Return

The `findInvalidBlocks` function returns an array with all blocks from the given ones that are "invalid" with respect to the passed validation function.
If no block was found, the function returns an empty array.

```js
const invalidBlocks = findInvalidBlocks( blocks, isValid );
```

## `findValidBlock`

The `findValidBlock` function allows for finding the first block that is considered "valid", given a validation function and a list of blocks to test.

### Usage

Pass an array of blocks and a validation function taking a single block as argument to `findValidBlock`, and then use the returned block, if any.

```js
const coreBlock = findValidBlock( blocks, ( { name } ) => /^core\//.test( name ) );
if ( ! coreBlock ) {
	return;
}

// Use coreBlock...
```

### Signature

```js
// findValidBlock :: ( blocks: object[], isValid: Function ) => ?object
const validBlock = findValidBlock( blocks, isValid );
```

### Parameters

#### `blocks`

An array of blocks.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `object[]`                           | yes                                  | `undefined`                          |

#### `isValid`

A validation function, taking a single block object as only argument, and returning a Boolean value.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `Function`                           | yes                                  | `undefined`                          |

### Return

The `findValidBlock` function returns the first block from the given blocks that is "valid" with respect to the passed validation function.
If no block was found, the function returns `undefined`.

```js
const validBlock = findValidBlock( blocks, isValid );
```

## `findValidBlocks`

The `findValidBlocks` function allows for finding all blocks that are considered "valid", given a validation function and a list of blocks to test.

### Usage

Pass an array of blocks and a validation function taking a single block as argument to `findValidBlocks`, and then use the returned blocks, if any.

```js
const coreBlocks = findValidBlocks( blocks, ( { name } ) => /^core\//.test( name ) );
if ( ! coreBlocks.length ) {
	return;
}

// Use coreBlocks...
```

### Signature

```js
// findValidBlocks :: ( blocks: object[], isValid: Function ) => object[]
const validBlocks = findValidBlocks( blocks, isValid );
```

### Parameters

#### `blocks`

An array of blocks.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `object[]`                           | yes                                  | `undefined`                          |

#### `isValid`

A validation function, taking a single block object as only argument, and returning a Boolean value.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `Function`                           | yes                                  | `undefined`                          |

### Return

The `findValidBlocks` function returns an array with all blocks from the given ones that are "valid" with respect to the passed validation function.
If no block was found, the function returns an empty array.

```js
const validBlocks = findValidBlocks( blocks, isValid );
```

## Dependencies

The Block Utils require the following dependencies, which are expected to be available:

- `@wordpress/data`
