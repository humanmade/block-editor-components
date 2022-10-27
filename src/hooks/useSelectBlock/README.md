# useSelectBlock

The `useSelectBlock` hook allows for comfortably selecting and scrolling to the block for a given client ID.
This is especially useful if you want to interactively navigate the user to select blocks, depending on what they are doing.

## Usage

Use the `useSelectBlock` hook, and then use the returned selector function.

```js
import { useSelectBlock } from '@humanmade/block-editor-components';
import { Button } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

function Plugin() {
	const selectBlock = useSelectBlock();

	const coverBlock = useSelect(
		( select ) => select( 'core/block-editor' ).getBlocks().find( ( { name } ) => name === 'core/cover' ),
		[]
	);

	if ( ! coverBlock ) {
		return null;
	}

	return (
		<Button onClick={ () => selectBlock( coverBlock.clientId ) }>Jump to Cover Block</Button>
	);
}
```

## Signature

```js
// useSelectBlock :: () => Function
const selectBlock = useSelectBlock();
```

## Parameters

The `useSelectBlock` hook does not have any parameters.

## Return

The `useSelectBlock` hook returns a selector function that takes a block client ID as only argument.

```js
const selectBlock = useSelectBlock();

selectBlock( clientId );
```
