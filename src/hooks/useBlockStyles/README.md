# useBlockStyles

The `useBlockStyles` hook allows for accessing all registered block styles for a given block name, as well as the default style.

This hook is internally used by the [`useActiveBlockStyle`](../useActiveBlockStyle/README.md) hook.

## Usage

Pass a block name to `useBlockStyles`, and then use the returned list of block styles or the default style.

```js
import { useBlockStyles } from '@humanmade/block-editor-components';
import { SelectControl } from '@wordpress/components';

function BlockEdit( props ) {
	const { name } = props;

	const { blockStyles, defaultStyle } = useBlockStyles( name );

	const options = blockStyles.map( ( { label, name } ) => ( {
		label,
		value: name,
	} ) );

	return (
		<SelectControl
			options={ options }
			value={ defaultStyle }
			onChange={ console.log }
		/>
	);
}
```

## Signature

```js
// useBlockStyles :: ( blockName: string ) => { blockStyles: { label: string, name: string }[], defaultStyle: string }
const { blockStyles, defaultStyle } = useBlockStyles( blockName );
```

## Parameters

### `blockName`

The name of the block.

| Type                                 | Required                             | Default                              |
|--------------------------------------|--------------------------------------|--------------------------------------|
| `string`                             | yes                                  | `undefined`                          |

## Return

The `useBlockStyles` hook returns an object with the list of registered block styles for the given name as `blockStyles` property and the specified default block styles as `defaultStyle` property.

```js
const { blockStyles, defaultStyle } = useBlockStyles( blockName );
```

## Dependencies

The `useBlockStyles` hook requires the following dependencies, which are expected to be available:

- `@wordpress/data`
