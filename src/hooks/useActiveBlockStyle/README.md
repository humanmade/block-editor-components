# useActiveBlockStyle

The `useActiveBlockStyle` hook allows for accessing the currently active block style for the block with the given client ID.

This hook internally uses the [`useBlockStyles`](../useBlockStyles/README.md) hook.

## Usage

Pass a block client ID to `useActiveBlockStyle`, and then use the returned block style name.

```js
import { useActiveBlockStyle } from '@humanmade/block-editor-components';

function BlockEdit( props ) {
	const { clientId } = props;

	const activeBlockStyle = useActiveBlockStyle( clientId );

	if ( activeBlockStyle === 'party' ) {
		return (
			<marquee>🎉🎊🥳🎊🎉</marquee>
		);
	}

	return null;
}
```

## Signature

```js
// useActiveBlockStyle :: ( clientId: string ) => string
const activeBlockStyle = useActiveBlockStyle( clientId );
```

## Parameters

### `clientId`

The client ID of the block.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `string`                             | yes                                  | `undefined`                          |

## Return

The `useActiveBlockStyle` hook returns the currently active block style for the block with the given client ID.

```js
const activeBlockStyle = useActiveBlockStyle( clientId );
```
