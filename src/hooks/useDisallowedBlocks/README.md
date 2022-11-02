# useDisallowedBlocks

The `useDisallowedBlocks` hook allows for disallowing select blocks for use as inner blocks.

## Usage

Pass an array with any block names to disallow to `useDisallowedBlocks`, and then use the returned list of allowed block names.

```js
import { useDisallowedBlocks } from '@humanmade/block-editor-components';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

function BlockEdit() {
	const allowedBlocks = useDisallowedBlocks( [ 'core/cover' ] );

	const blockProps = useBlockProps();

	const innerBlocksProps = useInnerBlocksProps(
		blockProps,
		{
			allowedBlocks,
		}
	);

	return (
		<div { ...innerBlocksProps } />
	);
}
```

Please note that all blocks with a `parent` specified will (continue to) be disallowed.

## Signature

```js
// useDisallowedBlocks :: ( disallowedBlocks: string[] ) => string[]
const allowedBlocks = useDisallowedBlocks( disallowedBlocks );
```

## Parameters

### `disallowedBlocks`

The block names to disallow.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `string[]`                           | yes                                  | `undefined`                          |

## Return

The `useDisallowedBlocks` hook returns the list of allowed block names, given the list of block names to disallow.

```js
const allowedBlocks = useDisallowedBlocks( disallowedBlocks );
```

## Dependencies

The `useDisallowedBlocks` hook requires the following dependencies, which are expected to be available:

- `@wordpress/blocks`
